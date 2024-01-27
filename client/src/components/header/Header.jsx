import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Welcome To</span>
        <span className="headerTitleLg">SparkTales</span>
      </div>
      <img
        className="headerImg"
        src="/images/billboard3.jpg"
        alt=""
      />
    </div>
  );
}
