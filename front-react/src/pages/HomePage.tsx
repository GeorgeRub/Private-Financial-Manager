import {fetchData} from "../services/TestConnections.tsx";
import {useEffect, useState} from "react";

const HomePage = () => {

    const [data, setData] = useState(null);
    useEffect(() => {
        const getData = async () => {
            try{
                const fetchDataLocal = await fetchData();
                setData(fetchDataLocal);
            }catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        getData().then(r => console.log(r));
    })

    return (
        <div className={'container'}>
            <div>Home page</div>
            <br/>
            <div>
                {data}
            </div>

        </div>
    )
}

export default HomePage