import Item1 from '../../images/img1.jpg'
import Item2 from '../../images/img2.jpg'
import Item3 from '../../images/img3.jpg'
import Item4 from '../../images/img4.jpeg'
import Item5 from '../../images/img5.jpg'
import Item6 from '../../images/img2.jpg'
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING } from '../Actions/Actions_Types/cartActionTypes'


const initState = {
    items: [
        { id: 1, title: 'Mi 10i', desc: "Mi 10i 5G (8GB RAM, 128GB Storage) - 108MP Quad Camera | Snapdragon 750G", price: 21999, img: Item1, brand: "Xiaomi", category: "mobile", tax: 10, discount: 10 },
        { id: 2, title: 'Mi 10T pro', desc: "Mi 10T Pro (128 GB) (8 GB RAM) · No cost EMI starting from ₹3,334/month.", price: 39999, img: Item2, brand: "Xiaomi", category: "mobile", tax: 18, discount: 9 },
        { id: 3, title: 'OnePlus 8 pro', desc: "OnePlus 8 Pro sports an impressive Fluid AMOLED display adopting a punch-hole", price: 60000, img: Item3, brand: "OnePlus", category: "Tablets", tax: 16, discount: 10 },
        { id: 4, title: 'Samsung s20 ultra', desc: "Samsung Galaxy S20 Ultra (12GB RAM, 128GB Storage), amoled display", price: 80999, img: Item4, brand: "Samsung", category: "mobile", tax: 18, discount: 10 },
        { id: 5, title: 'iphone 11 pro max', desc: "Apple iPhone 11 Pro Max (64 GB) · No cost EMI starting from ₹19,517/month.", price: 100800, img: Item5, brand: "Apple", category: "Tablets", tax: 15, discount: 12 },
        { id: 6, title: 'Mi 10T pro', desc: "Mi 10i 5G (8GB RAM, 128GB Storage) - 108MP Quad Camera | Snapdragon 750G", price: 21999, img: Item6, brand: "Xiaomi", category: "mobile", tax: 18, discount: 10 },
        { id: 7, title: 'Mi 10i', desc: "Mi 10i 5G (6GB RAM, 128GB Storage) - 108MP Quad Camera | Snapdragon 750G", price: 21999, img: Item1, brand: "Xiaomi", category: "mobile", tax: 18, discount: 10 }
    ],
    addedItems: [],
    total: 0,
    tax: 0,
    discount: 0



}
const cartReducer = (state = initState, action) => {

    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)

        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            addedItem.quantity += 1

            return {
                ...state,
                total: state.total + addedItem.price,
                discount: state.discount + addedItem.discount,
                tax: state.tax + addedItem.tax
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            // let tax = state.total + state.tax * 100
            let tax = state.tax + addedItem.tax
            let discount = state.discount + addedItem.discount
            // let totalTax = addedItem.price * tax / 100
            // let totalDiscount = addedItem.price * discount / 100
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],

                total: newTotal,
                tax: tax,
                discount: discount
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        let tax = state.tax - (itemToRemove.tax * itemToRemove.quantity)
        let discount = state.discount - (itemToRemove.discount * itemToRemove.quantity)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal,
            tax: tax,
            discount: discount

        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            let tax = state.tax - addedItem.tax
            let discount = state.discount - addedItem.discount
            return {
                ...state,
                addedItems: new_items,
                tax: tax,
                discount: discount,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }

    }

    if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    }

    if (action.type === 'SUB_SHIPPING') {
        return {
            ...state,
            total: state.total - 6
        }
    }

    else {
        return state
    }

}

export default cartReducer