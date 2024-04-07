"use client"
import { useEffect, useState } from "react"
import "./style.css"


const Random = () => {

    const [state, setState] = useState({avatar:"", first:"", last:"", title:"", city:""})

    const fetchData = async () => {
        try {
            const response = await fetch("https://random-data-api.com/api/v2/users?response_type=json")
            const data = await response.json()
            console.log(data)
            setState({
                avatar: data.avatar, 
                first: data.first_name,
                last: data.last_name, 
                title: data.employment.title, 
                city: data.address.city
            })
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container">
            <div className="card">
                <div className="img-container">
                    <img src={`${state.avatar}`} alt="avatar"/>
                </div>
                <div className="details">
                    <h2>{state.first} {state.last}</h2>
                    <h3>{state.title}</h3>
                    <h4><i className="fa-solid fa-location-dot"></i> &#xf041; {state.city}</h4>
                </div>
            </div>
            <button id="get-user-btn" onClick={fetchData}>Get Random User</button>
        </div>
    )
}

export default Random
