import { Injectable } from '@angular/core';
import {Item} from '../common/item.model'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({providedIn:'root'})
export class ItemService{
    
    constructor(private http:HttpClient){}

    getItems(){
         return   this.http.get<any[]>('http://127.0.0.1:3000/items')
            .pipe(map(data=>{
                return {items:data.map(data=>{
                    return {
                        id: data._id,
                        name: data.name,
                        price: +data.price,
                        description: data.description,
                        imagePath: data.imagePath
                    }
                })}
            }))
    }

    getItemById(id:string){
        return this.http.get<{_id:string, name:string, price:number, description:string, imagePath:string}>(`http://127.0.0.1:3000/items/${id}`)
        
    }

    addItem(name:string, price:number, description:string, image: File){
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price.toString());
        formData.append('description', description)
        formData.append('image', image)

        return this.http.post<any>('http://127.0.0.1:3000/items', formData)
        
    }

    updateItem(id:string, name:string, price:number, description:string, image: string|File){
        let item:Item | FormData
        if(typeof image==='object'){
            item = new FormData()
            item.append('id', id)
            item.append('name', name);
        item.append('price', price.toString());
        item.append('description', description)
        item.append('image',image)
        }

        else{
            item = {
                id,
                name,
                price,
                description,
                imagePath:image
            }
        }

        return this.http.put<any>(`http://127.0.0.1:3000/items/${id}`, item)
    }

    deleteItem(id:string){
        return this.http.delete<any>(`http://127.0.0.1:3000/items/${id}`)
    }


}