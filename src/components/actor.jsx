import React from 'react';
import Navbar from './navbar';
import Movie from './movie';
import root, { redirect } from './tools';
import '../styles/vazir-fonts.css'

import '../styles/main.css'
import '../styles/actor.css'
import '../styles/movies.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ActorMovie(props){
    return(
        <div className="col-4">
            <div className="iemdb-actor-movie cursor-pointer">
                <img src={props.image} className="iemdb-actor-movie-image" alt=""/>
                <div onClick={(e) => {redirect(e, <Movie movieId = {props.id}/>)}} className="iemdb-actor-movie-overlay">{props.name} <br /><br /> {props.imdbRate}</div>
            </div>
        </div>  
    )
}

class Actor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        const movies = []
        for(var index in this.state.movies){
            movies.push(<ActorMovie
                            id = {this.state.movies[index].id}
                            image = {this.state.movies[index].image}
                            name={this.state.movies[index].name} 
                            imdbRate={this.state.movies[index].imdbRate} 
                            key={this.state.movies[index].id}/>)
        }

        return(
            <div>
                 <Navbar showBox = "true"/>

                 <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "#b12025", color: "white" }}
                />

                <div className="main-container">
                    <div className="row mr-0">
                    <div className="col-sm-3">
                        <img src={this.state.image} className="iemdb-actor-image" alt=""/>
                    </div>
                    <div className="col-sm-9">
                        <div className="row ml-0 mr-0 mt-4">
                            <div className="col-7 iemdb-actor-info">
                                <h5>مشخصات بازیگر</h5>
                            </div>
                            <div className="col-5 iemdb-actor-info"></div>
                        </div>
                        <div className="row ml-0 mr-0 mt-4">
                            <div className="col-7 iemdb-actor-info"></div>
                            <div className="col-5 iemdb-actor-info">
                                <p dir="rtl">نام: {this.state.name}</p> 
                                <p dir="rtl">تاریخ تولد: {this.state.birthDate}</p>
                                <p dir="rtl">ملیت: {this.state.nationality}</p>
                                <p dir="rtl">تعداد فیلم: {this.state.nationality}</p>
                            </div>
                        </div>
                        <div className="row ml-0 mr-0 mt-4 mb-4">
                            <div className="col-7 iemdb-actor-info">
                                <h5 className="pr-4">فیلم ها</h5>
                            </div>
                            <div className="col-5 iemdb-actor-info"></div>
                        </div>
                        <div className="row ml-0 mr-0 pr-2 iemdb-actor-movie-container flex-row flex-nowrap overflow-auto">
                            {movies}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        var http1 = new XMLHttpRequest();
        http1.open('GET', 'http://localhost:8080/actors/' + this.props.actorId, true);
        http1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http1.setRequestHeader('jwt', localStorage.getItem('jwt'));
        http1.onreadystatechange = () => {
            if(http1.readyState == 4 && http1.status == 200) {
                this.setState(JSON.parse(http1.responseText).value)
            }
            else if (http1.readyState == 4 && ((http1.status == 400) || (http1.status == 401) || (http1.status == 403) || (http1.status == 404))) {
                for (var error in JSON.parse(http1.responseText).errors) {
                    toast.error(error, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
            else if (http1.readyState == 4) {
                toast.error('Something went wrong!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
        http1.send();

        var http2 = new XMLHttpRequest();
        http2.open('GET', 'http://localhost:8080/actors/' + this.props.actorId + "/movies", true);
        http2.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http2.setRequestHeader('jwt', localStorage.getItem('jwt'));
        http2.onreadystatechange = () => {
            if(http2.readyState == 4 && http2.status == 200) {
                this.setState(prevState => ({movies : JSON.parse(http2.responseText).value}))
            }
            else if (http2.readyState == 4 && ((http2.status == 400) || (http2.status == 401) || (http2.status == 403) || (http2.status == 404))) {
                for (var error in JSON.parse(http2.responseText).errors) {
                    toast.error(error, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }
            else if (http2.readyState == 4) {
                toast.error('Something went wrong!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        }
        http2.send();
    }
}

export default Actor;