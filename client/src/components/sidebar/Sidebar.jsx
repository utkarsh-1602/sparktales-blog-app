import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="images/aboutme.jpg"
          alt=""
          width="300px"
        />
        <p>
        Hello, I'm Utkarsh Hadgekar, a full stack developer. With building cross platform robust application with secure backend.  I've a good grasp of data structures and algorithms. I'm also an active Open Source Contributor. Beside my Technical Knowledge, I'm also good at Effective communication with the team and clients.  
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
