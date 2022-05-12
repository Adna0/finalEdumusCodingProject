import React from 'react';
import './css/bootstrap.css';


function NavBar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SiimNotes</a>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Notes
                                <span className="visually-hidden">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <button className="btn btn-warning text-dark"><i className="bi bi-clipboard-plus"></i> Create new Note</button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;