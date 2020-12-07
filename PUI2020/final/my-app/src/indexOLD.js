import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.css';

let tempArr = {};

function AddCurryModal(props) {
    return (
        <Modal id="bootstrap-overrides"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={ props.currySetter(Event) }>
                <Modal.Body className="container">
                    <h2>New Curry Entry</h2>
                    <div className="row">
                        <div className="col-8">
                            <Form.Label className="mb-1">Restaurant</Form.Label><br />
                            <Form.Control size="sm" name="restaurantName"  type="text" placeholder="Name of Restaurant" />
                            <br />

                            <Form.Label className="mb-1">Full Address of Restaurant</Form.Label>
                            <Form.Control size="sm" name="restaurantAddress" type="text" placeholder='e.g. "123 Thai St, Pittsburgh, PA"' />
                            <br />

                            <div className="container p-0">
                                <div className="row">
                                    <div className="col-8">
                                        <Form.Label className="mb-0">Curry Name</Form.Label>
                                        <br /><span className="sublabel">Include "curry" in name</span>
                                        <Form.Control size="sm" name="curryType" type="text" placeholder='e.g. "Red Curry"' />
                                    </div>
                                    <div className="col-4">
                                        <Form.Label className="mb-0">Rating</Form.Label>
                                        <br /><span className="sublabel">1=worst, 5=best</span>
                                        <Form.Control size="sm" name="curryRating" type="text" placeholder="1-5" />
                                    </div>
                                </div>
                            </div>

                            <br />
                            <Form.Label className="mb-1">Taste Notes</Form.Label>
                            <Form.Control as="textarea" name="tastingNotes" placeholder="Taste description of curry" rows={3} />

                        </div>

                        <div className="col-4">
                            <Form.Group>
                                <Form.Label className="mb-1">Add a Photo</Form.Label>
                                <Form.File name="curryPhoto" id="exampleFormControlFile1" />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" size="sm" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" type="submit" size="sm">Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

class Curry extends React.Component {

    render() {
        return (
            <div className="col-sm-6 mb-4">
                <div className="container mt-4 mt-sm-auto">
                    <div className="row">
                        <div className="col-sm-4">
                            <Image alt="curry" src={"/assets/images/noodlehead-red.jpg"} />
                        </div>
                        <div className="col-sm-8">
                            <h2 className="mb-0 curry-card-title">{this.props.restaurant}</h2>
                            <h3>{this.props.curry}</h3>
                            <p>
                                Taste notes: {this.props.tastingNotes}
                                <br />Rating: {this.props.rating}/5
                            </p>

                            <span className="delete-btn">
                            {/* <span onClick={() => deleteCurry()} className="delete-btn"> */}
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CurryIndex extends React.Component {
    renderAllCurries(curries){
        for(var i=0; i < Object.keys(curries).length; i++){
            console.log("curry: ", curries);
        }
    }

    renderCurryItem(restaurant, curryType, tastingNotes, rating) {
        return <Curry restaurant={restaurant} curry={curryType} tastingNotes={tastingNotes} rating={rating} />;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                        {this.renderAllCurries(this.props.curries)}
                        {/* {this.renderCurryItem("Thai Cottage", "Red Curry", "savory, mostly salty, spicy", 5)}
                        {this.renderCurryItem("Thai & Noodle Outlet", "Green Curry", "savory, salty, sweet", 4)} */}
                </div>
            </div>
        );
    }
}

class Home extends React.Component {
    state = {
        modalShow: false,
        curryArr: {},
    }

    setModalShow(bool) {
        this.setState({ modalShow: bool });
    }

    addNewCurry = (e) => {
        // pass as setter into modal component as prop
        // use set state to add a new obj to set
        let newCurry = {};
        for(var i=0; i < e.target.elements.length-2; i++){
                newCurry[e.target.elements[i].name] = e.target[i].value;
        }
        console.log("New curry: ", newCurry)
        tempArr.push(newCurry);
        this.setState({
            curryArr: tempArr
        })
        // this.setState({ curryArr: this.state.curryArr.concat(newCurry) });
        console.log("Curry state: ", this.state.curryArr)
    }

    render() {
        return (
            <div id="bootstrap-overrides">

                {/* Navbar */}
                <nav className="navbar mb-5">
                    <span className="navbar-brand">Custom Curry Index</span>

                    <div id="navbarNav">
                        <div className="navbar-nav flex-row">
                            <a href="#curryindex" className="nav-item nav-link active px-1 mr-2">Curry Index</a>
                            <a href="#map" className="nav-item nav-link px-1 mx-2">Map</a>
                        </div>
                    </div>
                </nav>

                {/* Curry Index: List of curries */}
                <div className="container">
                    <div className="header pb-3">
                        <h1 className="mb-0">Saved Curries</h1>
                        <a href="#add" onClick={() => this.setModalShow(true)}>
                            <u>+ Add New Curry</u>
                        </a>
                    </div>
                    <CurryIndex curries={this.state.curryArr}/>
                </div>
                <AddCurryModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                    currySetter={ () => this.addNewCurry.bind(this) }
                />

            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Home />,
    document.getElementById('root')
);
