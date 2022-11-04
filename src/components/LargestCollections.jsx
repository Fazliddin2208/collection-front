import React,{useState,useEffect} from 'react';
import axios from 'axios';

const LargestCollections = () => {

    const [collections,setCollections] = useState([])

  useEffect(()=>{
    fetchCollections()
  },[collections])

  const fetchCollections = async() =>{
    const response = await axios.get('/api/collections')
    const collections = await response.data
    setCollections(collections)
  }

    return (
        <div>
            <div className="my-cards row" >
                {collections && collections.sort((a,b)=>(a.items > b.items ? -1 : 1)).slice(0,5).map((collection)=>(
                    <div className="card my-card sm-3">
                    <img
                    src={collection.photo}
                    className="card-img-top"
                    alt="This is item's image"
                    />
                    <div className="card-body">
                    <h5 className="card-title">{collection.title}</h5>
                    <p className="card-text">
                        {collection.desc}
                    </p>
                    {collection.tegs.map((teg)=>(
                        <a href="#" className="my-teg">
                        {teg}
                        </a>
                    ))}
                    <ol>
                        {collection.items.map((item)=>(
                            <li>{item.title}</li>
                        ))}
                    </ol>
                    </div>
                    <div className="card-footer">
                    <div className="my-action">
                        <i className="fas fa-heart"></i>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};


export default LargestCollections;