import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faRobot,
  faCode,
  faFileCode,
  faChartBar,
  faExclamationTriangle,
  faUsers,
  faFolderOpen,
  faTachometerAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import commitAnalyzerClient from "../../api/commitAnalyzerClient";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
  "#00C49F",
  "#FF6B6B",
  "#4ECDC4",
];

const TeamReport = () => {
  const { team_name } = useParams();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [team_name]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await commitAnalyzerClient.get(
        `/api/v1/history/analytics/${team_name}`
      );

      let dataToUse = res.data;

      // Unwrap .data wrapper if present
      if (dataToUse.data) dataToUse = dataToUse.data;

      // API returns an array — extract the first element
      if (Array.isArray(dataToUse)) {
        dataToUse = dataToUse[0];
      }

      // If the object has a nested analytics property, merge it up
      if (
        dataToUse &&
        dataToUse.analytics &&
        (dataToUse.analytics.hourly_commits ||
          dataToUse.analytics.commit_count)
      ) {
        dataToUse = { ...dataToUse, ...dataToUse.analytics };
      }

      console.log("Final analytics data:", dataToUse);
      setAnalytics(dataToUse);
    } catch (err) {
      console.error("Fetch Analytics Error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReview = async () => {
    try {
      setAiLoading(true);
      const res = await commitAnalyzerClient.post(
        `/api/v1/collect/finalize-team/${team_name}`
      );
      if (res.data.success || res.status === 200) {
        await fetchAnalytics();
      } else {
        alert(
          "Failed to generate: " + (res.data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Generate Review Error:", err);
      alert(
        "Failed to generate review: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-purple-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mr-4"></div>
        Loading Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-400">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-4xl mb-4"
        />
        <p>{error}</p>
        <Link
          to="/commit-analyzer"
          className="text-purple-400 underline mt-4 block"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!analytics) return null;

  // --- Data Transformations ---

  // Convert flat hourly_commits array [3, 0, 0, ...] to chart data [{hour: "00:00", commits: 3}, ...]
  const hourlyCommitsData = (analytics.hourly_commits || []).map(
    (count, i) => ({
      hour: `${String(i).padStart(2, "0")}:00`,
      commits: count,
    })
  );

  // Convert flat hourly_volume array to chart data
  const hourlyVolumeData = (analytics.hourly_volume || []).map((vol, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    volume: vol,
  }));

  // Merge hourly data for combined chart
  const hourlyMergedData = hourlyCommitsData.map((item, i) => ({
    ...item,
    volume: hourlyVolumeData[i]?.volume || 0,
  }));

  // file_types: [{name: ".md", value: 0}, ...]
  const fileTypeData = analytics.file_types || [];

  // top_files: [{name: "test.md", value: 0}, ...]
  const topFilesData = analytics.top_files || [];

  // top_folders: [{name: "/", value: 0}, ...]
  const topFoldersData = analytics.top_folders || [];

  // top_contributors: [{name: "Saragorule13", commits: 3}, ...]
  const topContributors = analytics.top_contributors || [];

  // recent_commits: [{message, author_name, score, summary, url, date}, ...]
  const recentCommits = analytics.recent_commits || [];

  // Score color helper
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-400";
    if (score >= 5) return "text-yellow-400";
    if (score >= 3) return "text-orange-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 8) return "bg-green-500/20 border-green-500/30";
    if (score >= 5) return "bg-yellow-500/20 border-yellow-500/30";
    if (score >= 3) return "bg-orange-500/20 border-orange-500/30";
    return "bg-red-500/20 border-red-500/30";
  };

  return (
    <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto text-white">
      <Link
        to="/commit-analyzer"
        className="inline-flex items-center gap-2 text-purple-300 hover:text-white mb-8 transition-colors"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {analytics.team_name}
            </span>{" "}
            Report
          </h1>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div className="text-right">
            <p className="text-xs text-purple-300 uppercase tracking-widest">
              Total Commits
            </p>
            <p className="text-2xl font-bold">
              {analytics.commit_count || 0}
            </p>
          </div>
          <div className="text-right border-l border-white/10 pl-4">
            <p className="text-xs text-green-300 uppercase tracking-widest">
              Additions
            </p>
            <p className="text-2xl font-bold text-green-400">
              +{analytics.additions || 0}
            </p>
          </div>
          <div className="text-right border-l border-white/10 pl-4">
            <p className="text-xs text-red-300 uppercase tracking-widest">
              Deletions
            </p>
            <p className="text-2xl font-bold text-red-400">
              -{analytics.deletions || 0}
            </p>
          </div>
          <div className="text-right border-l border-white/10 pl-4">
            <p className="text-xs text-blue-300 uppercase tracking-widest">
              Churn Rate
            </p>
            <p className="text-2xl font-bold text-blue-400">
              {(analytics.churn_rate || 0).toFixed(1)}%
            </p>
          </div>
          <div className="text-right border-l border-white/10 pl-4">
            <p className="text-xs text-yellow-300 uppercase tracking-widest">
              Productivity
            </p>
            <p className="text-2xl font-bold text-yellow-400">
              {(analytics.productivity_score || 0).toFixed(1)}
            </p>
          </div>
        </div>
      </div>

      {/* AI Review Section */}
      <div
        className={`mb-10 rounded-2xl p-8 border backdrop-blur-md transition-all ${
          analytics.final_review
            ? "bg-purple-900/10 border-purple-500/30"
            : "bg-white/5 border-white/10"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-500/20 text-purple-300">
            <FontAwesomeIcon icon={faRobot} className="text-2xl" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">
              AI Code Review Analysis
            </h3>

            {analytics.final_review ? (
              <div className="prose prose-invert max-w-none text-gray-300">
                <p className="whitespace-pre-line leading-relaxed">
                  {analytics.final_review}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-400 mb-4">
                  No AI review generated yet. Generate a report to analyze
                  code quality, commit patterns, and productivity.
                </p>
                <button
                  onClick={handleGenerateReview}
                  disabled={aiLoading}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-purple-900/20"
                >
                  {aiLoading ? "Analyzing..." : "Generate Final Review"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Contributors */}
      {topContributors.length > 0 && (
        <div className="mb-10 bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="text-yellow-400" />
            Top Contributors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topContributors.map((contributor, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-yellow-500/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                  {contributor.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {contributor.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {contributor.commits} commit
                    {contributor.commits !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Hourly Activity */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faChartBar} className="text-blue-400" />
            Hourly Commit Activity
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyMergedData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="hour"
                  stroke="#9ca3af"
                  fontSize={10}
                  interval={2}
                />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderColor: "#334155",
                    color: "#fff",
                  }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar
                  dataKey="commits"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                  name="Commits"
                />
                <Bar
                  dataKey="volume"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                  name="Volume"
                />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* File Types */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faFileCode} className="text-green-400" />
            File Type Distribution
          </h3>
          <div className="h-64 flex items-center justify-center">
            {fileTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fileTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {fileTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500">No file type data available.</p>
            )}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-400">
            {fileTypeData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                ></span>
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>

        {/* Top Files */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faFileCode} className="text-pink-400" />
            Top Modified Files
          </h3>
          <div className="h-64">
            {topFilesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topFilesData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#9ca3af"
                    fontSize={11}
                    width={100}
                    tick={{ fill: "#d1d5db" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#ff8042"
                    radius={[0, 4, 4, 0]}
                    name="Changes"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No file data available.
              </p>
            )}
          </div>
        </div>

        {/* Top Folders */}
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faFolderOpen}
              className="text-orange-400"
            />
            Top Folders
          </h3>
          <div className="h-64">
            {topFoldersData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topFoldersData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#9ca3af"
                    fontSize={11}
                    width={100}
                    tick={{ fill: "#d1d5db" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderColor: "#334155",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#00C49F"
                    radius={[0, 4, 4, 0]}
                    name="Changes"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No folder data available.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Commits List */}
      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <FontAwesomeIcon icon={faCode} className="text-pink-400" />
          Recent Commits
        </h3>
        <div className="space-y-4">
          {recentCommits.length > 0 ? (
            recentCommits.map((commit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors"
              >
                {/* Score Badge */}
                <div
                  className={`flex flex-col items-center justify-center min-w-[48px] px-2 py-1.5 rounded-lg border ${getScoreBg(
                    commit.score
                  )}`}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`text-xs mb-0.5 ${getScoreColor(
                      commit.score
                    )}`}
                  />
                  <span
                    className={`text-lg font-bold ${getScoreColor(
                      commit.score
                    )}`}
                  >
                    {commit.score}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {commit.message}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                    <span className="text-blue-300">
                      {commit.author_name}
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(commit.date).toLocaleString()}
                    </span>
                  </div>
                  {commit.summary && (
                    <p className="mt-2 text-xs text-gray-400 italic">
                      {commit.summary}
                    </p>
                  )}
                </div>

                <a
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-purple-300 transition-colors whitespace-nowrap"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              No commit data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamReport;
