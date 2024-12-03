const express = require("express")
const app = express()
app.use(express.json());
const PORT = 8052
const cron = require('node-cron');
const categorys =[
    "Appetizers", "Main Course", "Desserts",  "Beverages"
]
const menu =[{
    id:1,
    name:"Burger",
    price:10.99,
    category : categorys[1]
},
{
    id:2,
    name :"Pizza",
    price:12.99,
    category : categorys[2]
}]
const orders =[]


app.get("/menu",
    (req, res) => {
        res.json(menu)
    }
)

app.post("/menu",
    (req, res) => {
        const newfood = req.body
        if (!newfood.id) {
            newfood.id = menu[menu.length - 1]?.id + 1 || 1;
        }
        
        const cat =  categorys.includes(newfood.category)
        console.log(newfood.category)
        console.log(cat)
        if (!cat ) {
            return res.status(400).json({ error: "Category not found" });
        }
        menu.push(newfood)
        res.json(newfood)
    }
)
app.post("/order",
    (req, res) => {
        const order = req.body
        const lastO = orders[orders.length-1]
        if(order.quantity <=1){
            res.status(401).json({ message: "Quntity must be More that 0" })
        }
        const findOrder = menu.find(item => item.name === order.name)
        if(!findOrder){
            res.status(401).json({ message: "Item not found" })
        }
        const temp = {
            id: lastO ? lastO.id + 1 : 1, 
            name: findOrder.name,
            price: findOrder?.price || 0,
            quantity: order.quantity,
            address: order.address,
            orderStatus: "Preparing"
        };
        orders.push(temp)   
        res.json({
            "total_prize" :(temp.price*temp.quantity)}
        )
    })
app.get("/order/:id",
    (req, res) => {
        const id = parseInt(req.params.id, 10);
    
        const order = orders.find(item => item.id === parseInt(id))
        if (order) {
            res.json(order)
            }
            else {
                res.status(404).json({ message: "Order not found" })
            }})
app.get("/order/:id",
    (req, res) => {
        const id = parseInt(req.params.id, 10);
    
        const order = orders.find(item => item.id === parseInt(id))
        if (order) {
            res.json(order)
            }
            else {
                res.status(404).json({ message: "Order not found" })
            }})
app.get("/order",
    (req, res) => {
            if (orders.length===0){
                res.status(404).json({ message: "No orders found" })
            }
            res.json(orders)
    })
cron.schedule('* * * * *', () => {
    if(orders.length===0){
        console.log("No orders found")
    }
    else
    { orders.forEach(order => {
         if (order.orderStatus === 'Preparing') 
            { 
                order.orderStatus = 'Out for Delivery'; 
            } 
         else if (order.orderStatus === 'Out for Delivery') 
            { 
                order.orderStatus = 'Delivered'; 
            } 
         else if (order.orderStatus==='Delivered'){
            orders.splice(orders.indexOf(order), 1);
        }
        }) 
         
         console.log('Order statuses updated:', orders); 
        }});
app.listen(PORT,()=>{
    console.log("server is running on port 8052")
})