import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./DashboardAdmin.css"
import { useEffect, useState } from 'react';
import LinesChart from './AdminComponents/LineChart/LineChart';
import { DoughnutChart } from './AdminComponents/DoughnutChart/DoughnutChart';
import Sales from './AdminComponents/Sales/Sales';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateProduct from './AdminComponents/CreateProduct/CreateProduct';
import { fetcher } from '../../utils/fetcherGet';
import Products from './Products/Products';


const DashboardAdmin = () => {

    const [show, setShow] = useState(false);
    const [productsCount, setProductsCount] = useState()
    const [userCount, setUserCount] = useState()
    const [salesCount, setSalesCount] = useState()
    const [totalProfit, setTotalProfits] = useState()

    const calculateProfits = (salesResponse) => {
        let total = 0;
        salesResponse.forEach(sale => {
            total += sale.amount
        });
        return total;
    }

    const getInfo = async () => {
        const usersResponse = await fetcher(`/admindashboard/users`)
        const productsResponse = await fetcher(`/admindashboard/products`)
        const salesResponse = await fetcher(`/admindashboard/tickets`)

        setUserCount(usersResponse)
        setProductsCount(productsResponse)
        setSalesCount(salesResponse)
        setTotalProfits(calculateProfits(salesResponse))
    }

    useEffect(() => {
        getInfo();
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [activeTab, setActiveTab] = useState('general');

    const handleTabs = (tab) => {
        setActiveTab(tab)
    }

    return (
        <div>
            <div>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Dashboard menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ButtonGroup vertical style={{ width: "50%" }} className='border-0 rounded-0'>
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-house-door"></i> Inicio</Button>
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-people"></i> Usuarios</Button>
                            <Button eventKey="profile" variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-ticket"></i> Ordenes</Button>
                            <Button variant='ligth' className='buttons_inside d-flex align-items-center justify-content-between p-2 '><i className="icon bi bi-upload"></i> Productos</Button>
                        </ButtonGroup>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
            <div className="dash_container">
                <div className="side_container">
                    <Button variant="primary" onClick={handleShow} style={{ width: "100%", height: "3rem" }} className="me-2 icon border-0 rounded-0">
                        <i className="bi bi-list"></i>
                    </Button>
                    <div className=" nav_container">
                        <Nav defaultActiveKey="/home" style={{ height: "100%" }} className="flex-column d-flex align-items-start justify-content-start">
                            <Nav.Link className="icon" onClick={() => handleTabs("general")}><i className="bi bi-house-door-fill"></i></Nav.Link>
                            <Nav.Link className="icon" onClick={() => handleTabs("users")} eventKey="link-1"><i className="bi bi-people"></i></Nav.Link>
                            <Nav.Link className="icon" onClick={() => handleTabs("sales")} eventKey="link-2"><i className="bi bi-ticket"></i></Nav.Link>
                            <Nav.Link className='icon' onClick={() => handleTabs("create")} eventKey="link-3"><i className="bi bi-upload"></i></Nav.Link>
                            <Nav.Link className='icon' onClick={() => handleTabs("products")} eventKey="link-4"><i className='bi bi-grid'></i></Nav.Link>
                        </Nav>
                    </div>
                </div>
                <div className='tabs_container'>
                    <Tabs
                        defaultActiveKey="general"
                        activeKey={activeTab}
                        id="justify-tab-example"
                        className="m-0 p-0 w-100 d-none"
                    >
                        <Tab className='w-100' eventKey="general" title="general">
                            <div className="info_container">
                                <div className='title_dashboard'>
                                    <h1>Indian&Co</h1>
                                </div>
                                <div className='metrics_container'>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Ventas totales</p>
                                            <p>{salesCount?.length}</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Total de productos</p>
                                            <p>{productsCount?.payload.length}</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Total de usuarios</p>
                                            <p>{userCount?.length}</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                    <div className='box_container'>
                                        <div className='info_metrics_container'>
                                            <p>Ganancias totales</p>
                                            <p>{totalProfit}</p>
                                        </div>
                                        <div className='icon_metrics_container'>
                                            <i className="icon bi bi-house-door-fill"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='charts_container'>
                                    <div className='line_chart_container'>
                                        <h2 className='sales_title'>Ventas de la semana</h2>
                                        <LinesChart></LinesChart>
                                    </div>
                                    <div className='doughnut_container'>
                                        <h2>Ventas del mes</h2>
                                        <DoughnutChart></DoughnutChart>
                                    </div>
                                </div>
                                <div className='recent_sales_container'>
                                    <div className='sale_title'><h1>Ordenes de compra</h1></div>
                                    <div className='sales'>
                                        <span className='size'>Nombre</span>
                                        <span className='size'>Fecha</span>
                                        <span className='size' >Télefono</span>
                                        <span className='size'>Registrado</span>
                                    </div>
                                    {userCount?.map(sale => {
                                        return (
                                            <div key={sale?._id} className='sales_in'>
                                                <p className='size' >{sale?.first_name}</p>
                                                <p className='size'>{sale?.last_name}</p>
                                                <p className='size'>{sale?.first_name}</p>
                                                <p className='size'>{sale?.first_name}</p>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab className='w-100' eventKey="users" title="users">
                            Esto es la vista de users
                        </Tab>
                        <Tab className='w-100' eventKey="sales" title="sales">
                            <Sales></Sales>
                        </Tab>
                        <Tab className='w-100' eventKey="create" title="create">
                            <CreateProduct></CreateProduct>
                        </Tab>
                        <Tab className='w-100' eventKey="products" title="products">
                            <Products></Products>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default DashboardAdmin;