import logo from './logo.svg';
import './App.css';
import Item from './components/Item'
import ItemDate from "./components/ItemDate"
import Card from "./components/Card"

function App() {

  const itemTwoName = "SurfExcel";


  const response =[
    { 
      itemName: "Tide",
      itemDate : "20",
      itemMonth: "March",
      itemYear: "1990"
    },    
    { 
      itemName: "555",
      itemDate : "21",
      itemMonth: "April",
      itemYear: "1992"
    },
  ];


  return (
    <div className="App">

      <Card>
        {/* First way of passing props */}
        <Item name='nirma'></Item>
        <ItemDate day='20' month='july' year='2000'></ItemDate>
        
        
        {/* Second way of passing props */}
        <Item name={itemTwoName}></Item>
        <ItemDate day='21' month='june' year='1990'></ItemDate>
        
        
        {/* Third way of passing props */}
        <Item name={response[0].itemName}></Item>
        <ItemDate day={response[0].itemDate} month={response[0].itemMonth} year={response[0].itemYear}></ItemDate>
        
        <Item name={response[1].itemName}>Hello jii</Item>
        <ItemDate day={response[1].itemDate} month={response[1].itemMonth} year={response[1].itemYear}></ItemDate>


        <div className='hello'>Hello world</div>
      </Card>
        
    </div>
  );
}

export default App;
