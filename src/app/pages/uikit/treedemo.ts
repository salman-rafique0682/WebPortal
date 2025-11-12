import {Component, inject, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {TreeModule} from 'primeng/tree';
import {FormsModule} from '@angular/forms';
import {TreeTableModule} from 'primeng/treetable';
import {CommonModule} from '@angular/common';
import {NodeService} from '@/pages/service/node.service';
import {CategoryService} from '@/pages/service/category.service';

import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { RippleModule } from 'primeng/ripple';
import { ChipModule } from 'primeng/chip';
import { FluidModule } from 'primeng/fluid';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


import { Observable } from 'rxjs';
interface Category {
    id: number;
    name: string;
}
@Component({
    selector: 'app-tree-demo',
    standalone: true,
    imports: [CommonModule, FormsModule, TreeModule, TreeTableModule, EditorModule,InputTextModule,FileUploadModule,ButtonModule,SelectModule, ToggleSwitchModule, RippleModule, ChipModule, FluidModule],
    template: `
        <div class="space-y-4">
            <div class="card">
                <span class="block text-surface-900 dark:text-surface-0 font-bold text-xl mb-6">Save Category</span>
                <p-fluid class="grid grid-cols-12 gap-4 flex-wrap">
                    <div class="col-span-12 lg:col-span-8">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12">
                                <input pInputText type="text" placeholder="Category Name" label="Category Name" [(ngModel)]="category.name" />
                            </div>
                            <div class="col-span-12 lg:col-span-4">
                                <input pInputText type="text" placeholder="Sub-Category" label="Sub-Category" />
                            </div>
                            <div class="col-span-12 lg:col-span-4">
                                <input pInputText type="text" placeholder="Sub-Category" label="Sub-Category" />
                            </div>
                            <div class="col-span-12 lg:col-span-4">
                                <input pInputText type="text" placeholder="Sub-Category" label="Sub-Category" />
                            </div>
                            <!--<div class="col-span-12">
                                <p-editor [(ngModel)]="product.description" [style]="{ height: '250px' }"></p-editor>
                            </div>-->
                            <!--<div class="col-span-12 mt-4">
                                <p-fileUpload
                                    #fileUploader
                                    name="demo[]"
                                    url="./upload.php"
                                    (onUpload)="onUpload($event)"
                                    [customUpload]="true"
                                    [multiple]="true"
                                    (onSelect)="onUpload($event)"
                                    accept="image/*"
                                    [showUploadButton]="true"
                                    [showCancelButton]="false"
                                    [auto]="true"
                                    styleClass="border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 p-0 rounded h-80"
                                >
                                    <ng-template #content>
                                        <div class="w-full h-full py-4" style="cursor: copy" (click)="fileUploader.advancedFileInput.nativeElement.click()">
                                            <div *ngIf="!product.images.length" class="h-full flex flex-col justify-center items-center">
                                                <i class="pi pi-file text-primary text-4xl mb-4"></i>
                                                <span class="block font-semibold text-surface-900 dark:text-surface-0 text-lg">Drop or select a cover image</span>
                                            </div>
                                            <div class="w-full py-4" *ngIf="product.images.length" [style]="{ cursor: 'copy' }">
                                                <div *ngFor="let file of product.images; let i = index" class="flex flex-wrap gap-8" (mouseenter)="onImageMouseOver(file)" (mouseleave)="onImageMouseLeave(file)" style="padding: 1px;">
                                                    <div class="remove-file-wrapper relative w-full h-60 border-4 border-transparent rounded hover:bg-primary hover:text-primary-contrast duration-100 cursor-auto" [style]="{ padding: '1px' }">
                                                        <img [src]="file.objectURL" [alt]="file.name" class="w-full h-full rounded shadow" />
                                                        <button
                                                            [id]="file.name"
                                                            #buttonEl
                                                            pButton
                                                            pRipple
                                                            rounded
                                                            type="button"
                                                            class="remove-button text-sm absolute justify-center items-center cursor-pointer"
                                                            style="top: -10px; right: -10px; display: none;"
                                                            (click)="removeImage($event, file)"
                                                        >
                                                            <i pButtonIcon class="pi pi-times"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ng-template>
                                </p-fileUpload>
                            </div>-->
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 flex flex-col gap-y-4">

                        <!--<div class="border border-surface-200 dark:border-surface-700 rounded">
                            <span class="text-surface-900 dark:text-surface-0 font-bold block border-b border-surface-200 dark:border-surface-700 p-4">Publish</span>
                            <div class="p-4">
                                <div class="bg-surface-100 dark:bg-surface-700 py-2 px-4 flex items-center rounded">
                                    <span class="text-black/90 dark:!text-surface-0 font-bold mr-4">Status:</span>
                                    <span class="text-black/60 dark:!text-surface-0 font-semibold">Draft</span>
                                    <button pButton pRipple type="button" icon="pi pi-fw pi-pencil" text rounded class="ml-auto"></button>
                                </div>
                            </div>
                        </div>

                        <div class="border border-surface-200 dark:border-surface-700 rounded">
                            <span class="text-surface-900 dark:text-surface-0 font-bold block border-b border-surface-200 dark:border-surface-700 p-4">Tags</span>
                            <div class="p-4 flex flex-wrap gap-1">
                                <p-chip
                                    *ngFor="let tag of product.tags; let i = index"
                                    styleClass="mr-2 py-2 px-4 text-surface-900 dark:text-surface-0 font-bold bg-surface-0 dark:bg-surface-900 border border-surface-200 dark:border-surface-700"
                                    [style]="{ 'border-radius': '20px' }"
                                >
                                    <span class="mr-4">{{ tag }}</span>
                                    <span class="flex w-4 h-4 items-center justify-center border border-surface-200 dark:border-surface-700 bg-gray-100 rounded-full cursor-pointer" (click)="onChipRemove(tag)">
                                        <i class="pi pi-fw pi-times text-black/60" style="font-size: 9px"></i>
                                    </span>
                                </p-chip>
                            </div>
                        </div>

                        <div class="border border-surface-200 dark:border-surface-700 rounded">
                            <span class="text-surface-900 dark:text-surface-0 font-bold block border-b border-surface-200 dark:border-surface-700 p-4">Category</span>
                            <div class="p-4">
                                <p-select [options]="categoryOptions" [(ngModel)]="product.category" placeholder="Select a category"></p-select>
                            </div>
                        </div>

                        <div class="border border-surface-200 dark:border-surface-700 rounded">
                            <span class="text-surface-900 dark:text-surface-0 font-bold block border-b border-surface-200 dark:border-surface-700 p-4">Colors</span>
                            <div class="p-4 flex">
                                <div
                                    *ngFor="let color of colorOptions"
                                    class="w-8 h-8 mr-2 border border-surface-200 dark:border-surface-700 rounded-full cursor-pointer flex justify-center items-center"
                                    [class]="color.background"
                                    (click)="onColorSelect(color.name)"
                                >
                                    <i class="pi pi-check text-sm text-white z-50" *ngIf="product.colors.indexOf(color.name) !== -1"></i>
                                </div>
                            </div>
                        </div>

                        <div class="border border-surface-200 dark:border-surface-700 flex justify-between items-center px-4 rounded">
                            <span class="text-surface-900 dark:text-surface-0 font-bold p-4">In stock</span>
                            <p-toggleswitch [(ngModel)]="product.inStock"></p-toggleswitch>
                        </div>-->
                        <div class="flex flex-col gap-4">
                            <div>
                                <button pButton pRipple label="Save" icon="pi pi-fw pi-check" (click)="onSave()"></button>
                            </div>
                            <div>
                                <p-toggleSwitch id="toggleSwitch" [(ngModel)]="isToggled"></p-toggleSwitch>
                                <label for="toggleSwitch">Is super category?</label>
                            </div>
                        </div>
                        
                    </div>
                </p-fluid>
            </div>

            <div class="card">
                <div class="font-semibold text-xl mb-4">TreeTable</div>
                <p-treetable [value]="treeTableValue" [columns]="cols" selectionMode="checkbox"
                             [(selectionKeys)]="selectedTreeTableValue" dataKey="key" [scrollable]="true"
                             [tableStyle]="{ 'min-width': '50rem' }">
                    <ng-template #header let-columns>
                        <tr>
                            <th *ngFor="let col of columns">
                                {{ col.header }}
                            </th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-rowNode let-rowData="rowData" let-columns="columns">
                        <tr [ttRow]="rowNode" [ttSelectableRow]="rowNode">
                            <td *ngFor="let col of columns; let i = index">
                                <span class="flex items-center gap-2">
                                    <p-treeTableToggler [rowNode]="rowNode" *ngIf="i === 0"/>
                                    <p-treeTableCheckbox [value]="rowNode" *ngIf="i === 0"/>
                                        <ng-container [ngSwitch]="col.field">
                                            <ng-container *ngSwitchCase="'edit'">
                                                <button pButton type="button" label="Edit" icon="pi pi-pencil" 
                                                        (click)="onEditCategory(rowNode)" class="p-button-sm p-button-text"></button>
                                            </ng-container>
                                            <ng-container *ngSwitchCase="'delete'">
                                                <button pButton type="button" label="Delete" icon="pi pi-trash" 
                                                        (click)="onDeleteCategory(rowNode)" class="p-button-rounded p-button-text p-button-danger" 
                                                        pTooltip="Delete" tooltipPosition="top"></button>
                                            </ng-container>
                                            <ng-container *ngSwitchDefault>
                                                {{ rowData[col.field] }}
                                            </ng-container>
                                    </ng-container>
                                </span>
                            </td>
                        </tr>
                    </ng-template>
                </p-treetable>
            </div>
        </div>
    `,
    providers: [NodeService, CategoryService]
})
export class TreeDemo implements OnInit {
    category: Category = {
        id: 0,
        name: '',
    };
    treeValue: TreeNode[] = [];
    //treeValue: Observable<TreeNode[]>;

    treeTableValue: TreeNode[] = [];

    selectedTreeValue: TreeNode[] = [];

    selectedTreeTableValue = {};

    cols: any[] = [];

    nodeService = inject(NodeService);
    categoryService = inject(CategoryService);
    
     //this.categoryService.getCategories();
    isToggled: boolean = false; // Default toggle state
    constructor(private http: HttpClient, private messageService: MessageService) {
        //console.log("point#2");
        //this.categoryService.getCategories().then((files) => (this.treeValue = files));
    }
// transformToTreeNode(data: any[]): TreeNode[] {
//     return data.map(item => ({
//       key: item.key,
//       label: item.name,
//       icon: item.icon,
//       data: item.name + " data",
//       children: item.subcategories ? this.transformToTreeNode(item.subcategories) : []
//     }));
//   }
  transformToTreeNode(data: any[]): TreeNode[] {
    return data.map(item => ({
      key: item.key,
      data: item.data,      
      children: item.children ? this.transformToTreeNode(item.children) : []
    }));
  }
    ngOnInit() {
        // this.categoryService.postData4().then((files) => {this.treeValue = this.transformToTreeNode(files);})
        // .catch(error => {console.error('Error fetching data:', error);});

        this.categoryService.postData4().then((files: any) => {this.treeTableValue = this.transformToTreeNode(files);})
        .catch(error => {console.error('Error fetching data:', error);});
       
        //this.nodeService.getFiles().then((files) => (this.treeValue = files));
        //this.nodeService.getTreeTableNodes().then((files: any) => (this.treeTableValue = files));

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'edit', header: 'edit'},
            {field: 'delete', header: 'delete'}
        ];
    }
    onSave(){
        
        this.http.post('https://localhost:7061/api/Categories', this.category,{
        headers: { Authorization: `Bearer`, accept: '*/*', "Content-Type": 'application/json' }})
        .subscribe({
            next: (response) => {
            console.log('Category saved successfully:', response);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Category saved successfully!'
            });
            // Optionally reset the form or update UI
            this.category = {
                id: 0,
                name: '',
            };
            },
            error: (error) => {
            console.error('Error saving category:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to save category. Please try again.'
            });
            }
        });
    }
    onEditCategory(rowNode: TreeNode) {
        // Example: Log the node or trigger edit logic
        console.log('Editing node:', rowNode.data);

        // // Optional: Show a toast notification
        // this.messageService.add({
        //     severity: 'info',
        //     summary: 'Edit',
        //     detail: `Editing ${rowNode.data.name}`,
        // });

        // Add your edit logic here, e.g., open a dialog, navigate to an edit form, etc.
        // Example: this.router.navigate(['/edit', rowNode.data.id]);
    }
    onDeleteCategory(rowNode: TreeNode) {
        console.log('Deleting node:', rowNode.data);
        // Implement delete logic, e.g., remove node from nodes array or call API
    }
    onToggleChange(event: any) {
        // Handle toggle change
        console.log('Toggle state:', this.isToggled);
    }
}
