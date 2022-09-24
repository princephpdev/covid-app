const Stats = ({ stats }) => {
  return (
    <div className="stats shadow w-full stats-vertical lg:stats-horizontal">
      <div className="stat">
        <div className="stat-title">Infected</div>
        <div className="stat-value text-blue-600">
          {stats && stats?.confirmed?.value}
        </div>
        <div className="stat-desc">Active Cases</div>
      </div>

      <div className="stat">
        <div className="stat-title">Recovered</div>
        <div className="stat-value text-green-600">
          {stats && stats?.recovered?.value}
        </div>
        <div className="stat-desc">Recovered So far</div>
      </div>

      <div className="stat">
        <div className="stat-title">Deaths</div>
        <div className="stat-value text-red-600">
          {stats && stats?.deaths?.value}
        </div>
        <div className="stat-desc">Passed away</div>
      </div>
    </div>
  );
};

export default Stats;
