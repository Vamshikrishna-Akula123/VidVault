// import { useCookies } from "react-cookie"
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToViewLater } from "../redux-slicer/video-slice";
// import store from "../redux-store/store";



// export function UserDashBoard(){

//     const [cookies, setCookie, removeCookie] = useCookies(['username']);
//     const[videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:0, Comments:[], CategoryId:0}]);                                               

//     let navigate = useNavigate();

//     let dispatch = useDispatch();

//     function handleSignout(){
//         removeCookie('username');
//         navigate('/user-login');
//     }

//     function handleSaveClick(video){
//         alert('video saved.....')
//         dispatch(addToViewLater(video));
//     }


    

//     useEffect(()=>{

//         axios.get(`http://127.0.0.1:5050/get-videos`)
//         .then(response=>{
//             setVideos(response.data);
//         });

//     },[])



//     return(
//         <div className="bg-light p-2 m-2">
//             <h3 className="d-flex justify-content-between">
//                 <div>
//                     <span>{cookies['username']}</span> <span>Dashboard</span>
//                 </div>
//                 <div>
//                     <button className="btn">{store.getState().store.VideosCount}</button>
//                 </div>
//                 <div>
//                     <button onClick={handleSignout} className="btn btn-link">SignOut</button>
//                 </div>
//             </h3>
//             <div className="row">
//                 <div className="col-2">
//                     <div className="mb-3">
//                         <label className="form-label fw-bold">Search Videos</label>
//                         <div className="input-group">
//                             <input type="text" className="form-control" />
//                             <button className="bi bi-search btn btn-warning"></button>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="form-label">Select Category</label>
//                         <div>
//                             <select className="form-select">
//                                 <option>Select Category</option>
//                                 <option>Java</option>
//                                 <option>Python</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-10">
//                     <section className="mt-4 d-flex felx-wrap">
//                         {
//                             videos.map(video=>
//                                 <div className="card m-2 p-2" style={{width:'250px'}}>
//                                     <div className="card-Title" style={{height:'30px'}}>
//                                         <h5>{video.Title}</h5>
//                                     </div>
//                                     <div className="card-body">
//                                         <iframe src={video.Url} className="w-100" height="150"></iframe>
//                                     </div>
//                                     <div className="card-footer">
//                                         <span className="bi bi-eye-fill"> {video.Views} </span>
//                                         <span className="bi bi-hand-thumbs-up mx-3"> {video.Likes} </span>
//                                         <span className="bi bi-hand-thumbs-down"> {video.Dislikes} </span>
//                                         <button className="bi bi-download btn mt-2" onClick={handleSaveClick} > Watch Later</button>
//                                     </div>
//                                 </div>
//                             )
//                         }
//                     </section>
//                 </div>
//             </div>
//         </div>
//     )
// }




import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToViewLater } from "../redux-slicer/video-slice";

export function UserDashBoard() {
    const [cookies, setCookie, removeCookie] = useCookies(['username']);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Use useSelector to get the video count from Redux
    const videoCount = useSelector(state => state.VideoNav.VideosCount);

    function handleSignout() {
        removeCookie('username');
        navigate('/user-login');
    }

    function handleSaveClick(video) {
        alert('Video saved!');
        dispatch(addToViewLater(video));
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:5050/get-videos`)
            .then(response => {
                setVideos(response.data);
            });
    }, []);

    return (
        <div className="bg-light p-2 m-2">
            <h3 className="d-flex justify-content-between">
                <div>
                    <span>{cookies['username']}</span> <span>Dashboard</span>
                </div>
                <div>
                    <button className="btn">{videoCount}</button>
                </div>
                <div>
                    <button onClick={handleSignout} className="btn btn-link">SignOut</button>
                </div>
            </h3>
            <div className="row">
                <div className="col-2">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Search Videos</label>
                        <div className="input-group">
                            <input type="text" className="form-control" />
                            <button className="bi bi-search btn btn-warning"></button>
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Select Category</label>
                        <div>
                            <select className="form-select">
                                <option>Select Category</option>
                                <option>Java</option>
                                <option>Python</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-10">
                    <section className="mt-4 d-flex flex-wrap">
                        {
                            videos.map(video => (
                                <div key={video.VideoId} className="card m-2 p-2" style={{ width: '250px' }}>
                                    <div className="card-title" style={{ height: '30px' }}>
                                        <h5>{video.Title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <iframe src={video.Url} className="w-100" height="150"></iframe>
                                    </div>
                                    <div className="card-footer">
                                        <span className="bi bi-eye-fill"> {video.Views} </span>
                                        <span className="bi bi-hand-thumbs-up mx-3"> {video.Likes} </span>
                                        <span className="bi bi-hand-thumbs-down"> {video.Dislikes} </span>
                                        <button onClick={() => handleSaveClick(video)} className="bi bi-download btn mt-2">
                                            Watch Later
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </div>
        </div>
    );
}



// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToViewLater } from "../redux-slicer/video-slice";

// export function UserDashBoard() {
//     const [cookies, setCookie, removeCookie] = useCookies(['username']);
//     const [videos, setVideos] = useState([]);
//     const [showSavedVideos, setShowSavedVideos] = useState(false); // Toggle saved videos
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     // Get saved videos and count from Redux
//     const savedVideos = useSelector(state => state.VideoNav.Videos);
//     const videoCount = useSelector(state => state.VideoNav.VideosCount);

//     function handleSignout() {
//         removeCookie('username');
//         navigate('/user-login');
//     }

//     function handleSaveClick(video) {
//         alert('Video saved!');
//         dispatch(addToViewLater(video));
//     }

//     function handleShowSavedVideos() {
//         setShowSavedVideos(!showSavedVideos); // Toggle display
//     }

//     useEffect(() => {
//         axios.get(`http://127.0.0.1:5050/get-videos`)
//             .then(response => {
//                 setVideos(response.data);
//             });
//     }, []);

//     return (
//         <div className="bg-light p-2 m-2">
//             <h3 className="d-flex justify-content-between">
//                 <div>
//                     <span>{cookies['username']}</span> <span>Dashboard</span>
//                 </div>
//                 <div>
//                     {/* Click to view saved videos */}
//                     <button className="btn" onClick={handleShowSavedVideos}>
//                         {videoCount}
//                     </button>
//                 </div>
//                 <div>
//                     <button onClick={handleSignout} className="btn btn-link">SignOut</button>
//                 </div>
//             </h3>

//             {/* Show saved videos if button is clicked */}
//             {showSavedVideos && (
//                 <div className="p-2">
//                     <h4>Saved Videos</h4>
//                     {savedVideos.length === 0 ? (
//                         <p>No saved videos yet.</p>
//                     ) : (
//                         savedVideos.map((video, index) => (
//                             <div key={index} className="card m-2 p-2" style={{ width: "250px" }}>
//                                 <h5>{video.Title}</h5>
//                                 <iframe src={video.Url} className="w-100" height="150"></iframe>
//                                 <p>{video.Description}</p>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}

//             <div className="row">
//                 <div className="col-2">
//                     <div className="mb-3">
//                         <label className="form-label fw-bold">Search Videos</label>
//                         <div className="input-group">
//                             <input type="text" className="form-control" />
//                             <button className="bi bi-search btn btn-warning"></button>
//                         </div>
//                     </div>
//                     <div>
//                         <label className="form-label">Select Category</label>
//                         <div>
//                             <select className="form-select">
//                                 <option>Select Category</option>
//                                 <option>Java</option>
//                                 <option>Python</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-10">
//                     <section className="mt-4 d-flex flex-wrap">
//                         {videos.map(video => (
//                             <div key={video.VideoId} className="card m-2 p-2" style={{ width: '250px' }}>
//                                 <div className="card-title" style={{ height: '30px' }}>
//                                     <h5>{video.Title}</h5>
//                                 </div>
//                                 <div className="card-body">
//                                     <iframe src={video.Url} className="w-100" height="150"></iframe>
//                                 </div>
//                                 <div className="card-footer">
//                                     <span className="bi bi-eye-fill"> {video.Views} </span>
//                                     <span className="bi bi-hand-thumbs-up mx-3"> {video.Likes} </span>
//                                     <span className="bi bi-hand-thumbs-down"> {video.Dislikes} </span>
//                                     <button onClick={() => handleSaveClick(video)} className="bi bi-download btn mt-2">
//                                         Watch Later
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </section>
//                 </div>
//             </div>
//         </div>
//     );
// }
