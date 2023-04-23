import { useEffect, useState } from "react";
import toastr from "toastr";

function profile() {
    const [user, setUser] = useState(null);

    // Add pet state
    const [petName, setPetName] = useState("");
    const [petType, setPetType] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [petSize, setPetSize] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petAllergies, setPetAllergies] = useState("");
    const [petDiet, setPetDiet] = useState("");
    const [petOtherNeeds, setPetOtherNeeds] = useState("");

    // list of pets
    const [pets, setPets] = useState([]);

    // list of orders
    const [orders, setOrders] = useState([]);

    // show add pet form
    const [showAddPetForm, setShowAddPetForm] = useState(false);

    // add pet to database
    const addPet = async () => {
        // send post request to /api/pets
        const res = await fetch("/api/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "add",
                data: {
                    pet: {
                        name: petName,
                        type: petType,
                        breed: petBreed,
                        size: petSize,
                        age: petAge,
                        allergies: petAllergies,
                        diet: petDiet,
                        other_needs: petOtherNeeds,
                        user_id: user.id,
                    }
                },
            }),
        });

        // get response
        const data = await res.json();

        // if successful, show success message
        if (data.success) {
            toastr.success("Successfully added pet");
            setShowAddPetForm(false);
            getPets(user.id);
        }
        // if failed, show error message
        else {
            toastr.error("Failed to add pet");
        }
    };

    // get pets from database
    const getPets = async (user_id) => {
        // send get request to /api/pets
        const res = await fetch("/api/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "get",
                data: {
                    user_id: user_id,
                },
            }),
        });

        // get response
        const data = await res.json();

        // if successful, show success message
        if (data.success) {
            setPets(data.pets);
        }
        // if failed, show error message
        else {
            toastr.error("Failed to get pets");
        }
    };

    // delete pet from database
    const deletePet = async (pet_id) => {
        // send delete request to /api/pets
        const res = await fetch("/api/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "delete",
                data: {
                    pet_id: pet_id,
                },
            }),
        });

        // get response
        const data = await res.json();

        // if successful, show success message
        if (data.success) {
            toastr.success("Successfully deleted pet");
            getPets(user.id);
        }

        // if failed, show error message
        else {
            toastr.error("Failed to delete pet");
        }
    };

    // get orders from database
    const getOrders = async (user_id) => {
        // send get request to /api/orders
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                operation: "orders",
                user_id: user_id,
            }),
        });

        // get response
        const data = await res.json();

        // if successful, show success message
        if (data.success) {
            setOrders(data.orders);
        }
        // if failed, show error message
        else {
            toastr.error("Failed to get orders");
        }
    };

    // check if user is logged in, local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        // if user is logged in, show profile
        if (user) {
            setUser(user);

            // get pets
            getPets(user.id);

            // get orders
            getOrders(user.id);
        } else {
            // redirect to login page
            window.location.href = "/login";
        }
    }, []);

    // if user is logged in, show profile
    if (user) {
        return (
            <div style={{
                backgroundColor: "#000000",
                minHeight: "100vh",
            }}>
                <div className='container'>
                    <div className='py-5 text-center text-light'>
                        <p className='display-4 font-weight-bold'>Welcome, {user.name}!</p>
                        <p className='lead'>
                            This is your profile page. You can view your information and update it here.
                        </p>
                        <button className='btn btn-primary btn-lg' onClick={() => setShowAddPetForm(true)}>Add Pet</button>
                        <br />
                        <a href="/wishlist" className='btn btn-light mt-3'>My Wishlist</a>
                    </div>
                    {showAddPetForm && (
                        <div className="card">
                            <div className="card-header">
                                <div className="clearfix">
                                    <div className="float-left">
                                        <h3 className="card-title">Add Pet</h3>
                                    </div>
                                    <div className="float-right">
                                        <button className="btn btn-outline-secondary" onClick={() => setShowAddPetForm(false)}>
                                            &times;</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        {/* Pet name */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petName">Pet Name</label>
                                            <input type="text" className="form-control" id="petName" placeholder="Enter pet name" onChange={(e) => setPetName(e.target.value)} />
                                        </div>
                                        {/* Type: Dog, Cat, Bird, Rabbit, reptile, Fish, Other */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petType">Type</label>
                                            <select id="petType" className="form-control" onChange={(e) => setPetType(e.target.value)}>
                                                <option selected>Choose...</option>
                                                <option>Dog</option>
                                                <option>Cat</option>
                                                <option>Bird</option>
                                                <option>Rabbit</option>
                                                <option>Reptile</option>
                                                <option>Fish</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        {/* Breed: input */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petBreed">Breed</label>
                                            <input type="text" className="form-control" id="petBreed" placeholder="Enter pet breed" onChange={(e) => setPetBreed(e.target.value)} />
                                        </div>
                                        {/* Size: Small, Medium, Large */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petSize">Size</label>
                                            <select id="petSize" className="form-control" onChange={(e) => setPetSize(e.target.value)}>
                                                <option selected>Choose...</option>
                                                <option>Small</option>
                                                <option>Medium</option>
                                                <option>Large</option>
                                            </select>
                                        </div>
                                        {/* Age: input */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petAge">Age</label>
                                            <input type="text" className="form-control" id="petAge" placeholder="Enter pet age" onChange={(e) => setPetAge(e.target.value)} />
                                        </div>
                                        {/* Any allergies: input */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petAllergies">Allergies</label>
                                            <input type="text" className="form-control" id="petAllergies" placeholder="Enter pet allergies" onChange={(e) => setPetAllergies(e.target.value)} />
                                        </div>
                                        {/* Diet needs: input */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petDiet">Diet needs</label>
                                            <input type="text" className="form-control" id="petDiet" placeholder="Enter pet diet" onChange={(e) => setPetDiet(e.target.value)} />
                                        </div>
                                        {/* Other needs: input */}
                                        <div className="form-group col-md-6">
                                            <label htmlFor="petOther">Other needs</label>
                                            <input type="text" className="form-control" id="petOther" placeholder="Enter pet other needs" onChange={(e) => setPetOtherNeeds(e.target.value)} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary" onClick={addPet}>Add Pet</button>
                                <button type="submit" className="btn btn-outline-danger ml-4" onClick={() => setShowAddPetForm(false)}>Cancel</button>
                            </div>
                        </div>
                    )}

                    <div className="bg-light rounded-lg p-2 mt-5">
                        <h2 className=''>My Pets</h2>
                        <div className='row'>
                            {/* if no pets */}
                            {pets.length === 0 && (
                                <div className='col-md-12 mx-auto'>
                                    <p className='lead'>You have no pets yet</p>
                                </div>
                            )}

                            {pets.map((pet) => (
                                <div className='col-md-4' key={pet._id}>
                                    <div className='card mb-4 shadow-sm'>
                                        <div className='card-header'>
                                            <h4 className='my-0 font-weight-normal'>{pet.name}</h4>
                                        </div>
                                        <div className='card-body'>
                                            <p className='card-text'>Type: {pet.type}</p>
                                            <p className='card-text'>Breed: {pet.breed}</p>
                                            <p className='card-text'>Size: {pet.size}</p>
                                            <p className='card-text'>Age: {pet.age}</p>
                                            <p className='card-text'>Allergies: {pet.allergies}</p>
                                            <p className='card-text'>Diet needs: {pet.diet}</p>
                                            <p className='card-text'>Other needs: {pet.other_needs}</p>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='btn-group'>
                                                    <button type='button' className='btn btn-sm btn-outline-secondary' onClick={() => deletePet(pet._id)}>Remove pet</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-light rounded-lg p-2 mt-5">
                        <h2 className=''>Order history</h2>
                        <div className='row'>
                            {/* if no orders */}
                            {orders.length === 0 && (
                                <div className='col-md-12 mx-auto'>
                                    <p className='lead'>You have no orders yet</p>
                                </div>
                            )}

                            {orders.map((order) => (
                                <div className='col-md-12' key={order._id}>
                                    <p>{new Date(order.date).toLocaleDateString()} - <a href="#">#{order._id}</a>&nbsp; - <span className="text-success">${order.totalPrice.toFixed(2)}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='py-5'></div>
                <div className='py-5'></div>
            </div>
        );
    }
}

export default profile;