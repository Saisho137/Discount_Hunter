import React from 'react';
import Layout from '../components/layout';
import GamePreview from '../components/gamePreview';
import styles from "../styles/wishlist.module.css"
import { useState, useEffect } from 'react';
import axios from "axios"
import {useRouter} from "next/navigation"

const Wishlist = () => {

    const [listWish, setListWish] = useState([])
    const [token, setToken] = useState("")
    const {push} = useRouter()

    const getWishlist = async() => {
        const storedToken = localStorage.getItem("token")
        setToken(storedToken)
        if(storedToken == null){
            push("/")
            return
        }
        const {data} = await axios.get(`http://localhost:8698/getWishlist`, {headers:{Authorization:`Bearer ${storedToken}`}})
        setListWish(data.WishlistGames)
    }

    useEffect(() => {
        getWishlist()
    }, []);

    return (
        <Layout>
        <hr/>
        <div>
            <h4 className={`${styles.rfounde} ${styles.text}`}>
                {listWish.length} Results found
            </h4>
            {!listWish[0] ? <>No added games</> :listWish.map((game) => (
                <div key={game.info.gameId}>
                    <GamePreview image={game.info.thumb} title={game.info.title} price={game.info.deal.price} id={game.info.gameId}/>
                </div>
                
            ))}
        </div>
        <hr/>
        
        </Layout>
    );
}

export default Wishlist;
