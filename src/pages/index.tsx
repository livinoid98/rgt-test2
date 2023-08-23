import { useState } from "react";
import {useRecoilState} from "recoil"
import { cartState } from "@/state/recoil";
import axios from "axios";

const ShoppingCart = () => {
    const [cart, setCart] = useRecoilState<any>(cartState);
    const [selected, setSelected] = useState<any>(1);
    const menu = {
        coffee: [{name:"아메리카노 (HOT)", price: "2000원"},
        {name:"아메리카노 (ICE)", price: "2300원"},
        {name:"카페라떼 (HOT)", price: "3500원"},
        {name:"카푸치노", price: "4000원"}],
        tea:[{name:"레몬 에이드", price: "3500원"},
        {name:"밀크쉐이크", price: "4500원"},
        {name:"말차라떼", price: "4500원"},
        {name:"초코라떼", price: "5000원"}],
        dessert:[{name:"초코 쿠키", price: "2500원"},
        {name:"아몬드 쿠키", price: "3000원"},
        {name:"초코 케익", price: "4000원"},
        {name:"딸기 케익", price: "4500원"}],
        other:[{name:"생수", price: "2000원"},
        {name:"콜라", price: "2500원"},
        {name:"사이다", price: "2500원"},
        {name:"페리에", price: "4000원"}]
    }

    const addCart = (name: string, price: string) => {
        setCart((prevCart:any) => [...prevCart, {name, price}]);
    }

    const postOrder = () => {
        for(let i=0; i<cart.length; i++){
            axios.post('http://localhost:5000/codingTest/post', {
                order_id: "0001", 
                product_name: cart[i].name,
            }).then((data) => {
                if(data.status === 200){
                    alert("주문이 접수되었습니다.");
                }

                if(data.status === 500){
                    alert("시스템 에러, 관리자에게 문의하세요.");
                }
            })
        }
    }
    return(
        <>
            <div className="menu-wrap">
                <nav>
                    <ul>
                        <li onClick={() => setSelected(1)}>커피</li>
                        <li onClick={() => setSelected(2)}>차/음료</li>
                        <li onClick={() => setSelected(3)}>디저트</li>
                        <li onClick={() => setSelected(4)}>기타</li>
                    </ul>
                </nav>
                <div className="menu-content">
                    {
                        selected === 1 ?
                        menu.coffee.map((value, index) => {
                            return(
                                <div key={index}>
                                    <h4>{value.name}</h4>
                                    <p>{value.price}</p>
                                    <button onClick={() => addCart(value.name, value.price)}>장바구니 담기</button>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                    {
                        selected === 2 ?
                        menu.tea.map((value, index) => {
                            return(
                                <div key={index}>
                                    <h4>{value.name}</h4>
                                    <p>{value.price}</p>
                                    <button onClick={() => addCart(value.name, value.price)}>장바구니 담기</button>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                    {
                        selected === 3 ?
                        menu.dessert.map((value, index) => {
                            return(
                                <div key={index}>
                                    <h4>{value.name}</h4>
                                    <p>{value.price}</p>
                                    <button onClick={() => addCart(value.name, value.price)}>장바구니 담기</button>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                    {
                        selected === 4 ?
                        menu.other.map((value, index) => {
                            return(
                                <div key={index}>
                                    <h4>{value.name}</h4>
                                    <p>{value.price}</p>
                                    <button onClick={() => addCart(value.name, value.price)}>장바구니 담기</button>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                </div>
                <div className="cart-list">
                    <h4>Cart</h4>
                    {cart.map((value: any, index: any) => {
                        return(
                            <div key={index}>
                                <h4>{value.name}</h4>
                                <p>{value.price}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="order-button-wrap">
                    <button onClick={postOrder}>전체 주문하기</button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart;