import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios  from "axios";

export function AdminDeleteVideo(){

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:0, Comments:[], CategoryId:0}]);                                               

    let params = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    }, [])

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
        navigate('/admin-dash');
    }

    return(
        <div className="bg-light m-3 p-2 w-25">
            <h3>Are you sure? want to delete !</h3>
            <dl>
                <dt>Title</dt>
                <dd>{videos[0].Title}</dd>
                <dt>Description</dt>
                <dd>{videos[0].Description}</dd>
            </dl>
            <button onClick={handleDeleteClick} className="btn btn-danger">Yes</button>
            <Link to="/admin-dash" className="btn btn-warning ms-2">No</Link>
        </div>
    )
}