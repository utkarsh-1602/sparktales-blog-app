import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      try {
        console.log("THis is working ")
        let response = await axios.post("http://localhost:5000/api/posts/uploadImage", data);
        console.log('thill here its working ')
        console.log("Image uploaded to cloudinary: ", response.data)
        let uploadedPhoto = response.data.result.url; 
        newPost.photo = uploadedPhoto; 
        newPost.photo_publicId = response.data.result.public_id;
        console.log(uploadedPhoto)
        console.log('it worked ')
      } catch (err) {console.log("ERROR: ", err)}
    }
    try {
      console.log('its here ')
      const res = await axios.post("/posts", newPost);
      console.log("Postadded: ", res)
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  );
}
