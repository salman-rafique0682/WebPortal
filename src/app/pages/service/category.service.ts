import {Injectable} from '@angular/core';
import {TreeNode} from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { lastValueFrom } from 'rxjs';
import { Observable, of,  } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; // Import map and catchError

@Injectable()
export class CategoryService {
    private apiUrl = 'https://localhost:7061/'; // Replace with your API URL
    categories: TreeNode<any[]>[] = [];
    constructor(private http: HttpClient, private messageService: MessageService) {

    }
    private responseToTreeNodes(response: any): TreeNode<any[]>[] {
      // Assuming response has a top-level array or object to map from
      const rootData = response;  // Adjust key to your response
      //console.log(rootData);
      return rootData.map((item: any) => this.itemToTreeNode(item));
    }

    private itemToTreeNode(item: any): TreeNode<any[]> {
      const node: TreeNode<any[]> = {
        label: item.name || item.label,  // Display label
        data: item.childrenData || [item],  // Store any[] or response object as array if needed
        key: item.id?.toString(),  // Unique key
        expanded: true,  // Optional: Start expanded
        children: item.countries ? item.countries.map((child: any) => this.itemToTreeNode(child)) : undefined
      };
      return node;
    }  
    apiCallCategories():TreeNode<any[]>[] { 
      console.log("point#1");
        const body = {
            id: 0,
            name: "Electronics", // Example property
        };
        this.http.post(this.apiUrl + 'api/Categories/all', body,{
        headers: { Authorization: `Bearer`, accept: '*/*', "Content-Type": 'application/json' }})
        .subscribe({
            next: (response) => {
              console.log("point#2");
                return this.responseToTreeNodes(response);// response as TreeNode<any[]>[];
            },
            error: (error) => {
              console.log("point#3");
                return [] as TreeNode<any[]>[];
            }
        });
        console.log("point#4");
        return [] as TreeNode<any[]>[];
    }
    getCategories() {
        return Promise.resolve(this.apiCallCategories());
    }
postData() {
          const body = {
            id: 0,
            name: "Electronics", // Example property
        };
    return this.http.post(this.apiUrl + 'api/Categories/all', body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (response) => {console.log('Success:', response); return response;},
      error: (error) => {console.error('Error:', error); return error;}
    });
  }
  postData2() {
    return Promise.resolve(this.postData());
  }

    getData(){
        const body = {
            id: 0,
            name: "Electronics", // Example property
        };
        


      console.log("point#1");

        this.http.post(this.apiUrl + 'api/Categories/all', body,{
        headers: { Authorization: `Bearer`, accept: '*/*', "Content-Type": 'application/json' }})
        .subscribe({
            next: (response) => {
              console.log("point#2");
                return this.responseToTreeNodes(response);// response as TreeNode<any[]>[];
            },
            error: (error) => {
              console.log("point#3");
                return [] as TreeNode<any[]>[];
            }
        });
      //return this.http.post<any[]>('your-api-endpoint');
    }
    postData3(): Observable<TreeNode[]> {
    const body = {
      id: 0,
      name: 'Electronics'
    };
    return this.http.post<TreeNode[]>(this.apiUrl + 'api/Categories/all', body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  postData4(): Promise<TreeNode[]> {
  return lastValueFrom(this.postData3());
}
}
