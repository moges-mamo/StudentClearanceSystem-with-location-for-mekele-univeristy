import { useEffect, useState } from 'react';
import ajax from "../../../services/fetchService";
import { useUser } from "../../../UserProvider/index";
import { Link } from 'react-router-dom';
import "../../../styles/Registration.css";
import styles from "../../../styles/table.css";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const CollegeViewComponent = ({ url }) => {
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const user = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("Select Filter Type");
    const filteredReasons = ['By Staff Id', 'All'];
    const [showStaffId, setShowStaffId] = useState(false);
    const [staffId, setStaffId] = useState('');

    useEffect(() => {
        setIsLoading(true);
        console.log("college-url:" + url);
        ajax(url, 'GET', user.jwt)
            .then((data) => {
                setDatas(data);
                setFilteredData(data); // Initialize filteredData with the fetched data
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                toast.error("Failed to load data");
            });
    }, [url, user.jwt]);

    useEffect(() => {
        if (selectedFilter === "By Staff Id") {
            setShowStaffId(true);
        } else {
            setShowStaffId(false);
            setStaffId(''); // Reset staffId when filter changes
        }
    }, [selectedFilter]);

    const handleChange = (e) => {
        setStaffId(e.target.value);
    };

    useEffect(() => {
        if (selectedFilter === "By Staff Id") {
            const filtered = datas.filter(data => data.account.username.includes(staffId));
            setFilteredData(filtered);
        } else if (selectedFilter === "All") {
            setFilteredData(datas); // Reset to show all data
        }
    }, [staffId, selectedFilter, datas]);

    const ResponseFormatter = ({ col1, col2, col3, col4 }) => ( <
        div className = "row" >
        <
        div className = "col" > < label className = "labelM" > { col1 } < /label></div >
        <
        div className = "col" > < label className = "labelM" > { col2 } < /label></div >
        <
        div className = "col" > < label className = "labelM fullName" > { col3 } < /label></div >
        <
        div className = "col" >
        <
        Link to = { `/view_status/${col4}` }
        style = {
            { cursor: "pointer" } } >
        <
        label className = "labelM" > Details < /label> <
        /Link> <
        /div> <
        /div>
    );

    return ( <
        div > { isLoading && < Loader / > } <
        div className = { styles.HrRegistrar } >
        <
        div className = "filter-container" >
        <
        label className = { styles.formLabel } > Reason < /label> <
        select className = "dropdown"
        value = { selectedFilter }
        onChange = {
            (e) => setSelectedFilter(e.target.value) } >
        <
        option > Select Filter Type < /option> {
            filteredReasons.map((reason, index) => ( <
                option key = { index }
                value = { reason } > { reason } <
                /option>
            ))
        } <
        /select>

        {
            showStaffId && ( <
                input type = "text"
                placeholder = "Enter StaffId"
                required value = { staffId }
                onChange = { handleChange }
                className = "input-field" /
                >
            )
        } <
        /div>

        { /* Header Row */ } <
        div className = "row"
        style = {
            { backgroundColor: '#ccccff' } } >
        <
        div className = "col" > < label className = "fullName" > Staff ID < /label></div >
        <
        div className = "col" > < label className = "fullName" > Full Name < /label></div >
        <
        div className = "col" > < label > College < /label></div >
        <
        div className = "col" > < label > Details < /label></div >
        <
        /div>

        {
            filteredData && filteredData.map((data, index) => ( <
                ResponseFormatter key = { index }
                col1 = { data.account.username }
                col2 = { `${data.fname} ${data.mname}` }
                col3 = { data.college.name }
                col4 = { data.id }
                />
            ))
        } <
        /div> <
        /div>
    );
};

export default CollegeViewComponent;