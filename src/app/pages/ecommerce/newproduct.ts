import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';

interface Product {
    id: number;
    name: string;
    price: string;
    code: string;
    sku: string;
    status: number;
    tags: string[];
    category: string;
    colors: string[];
    stock: string;
    inStock: boolean;
    description: string;
    images: Image[];
    imgURL: string;
}

interface Image {
    name: string;
    objectURL: string;
}
@Component({
    selector: 'app-new-product',
    imports: [CommonModule, EditorModule, InputTextModule, FormsModule, FileUploadModule, ButtonModule, SelectModule, ToggleSwitchModule, RippleModule, ChipModule, FluidModule, TreeSelectModule],
    template: `
        <div class="card">
            <span class="block text-surface-900 dark:text-surface-0 font-bold text-xl mb-6">Create Product</span>
            <p-fluid class="grid grid-cols-12 gap-4 flex-wrap">
                <div class="col-span-12 lg:col-span-8">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12">
                            <input pInputText type="text" placeholder="Product Name" label="Product Name" [(ngModel)]="product.name" />
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <input pInputText type="text" placeholder="Product Code" label="Product Code" [(ngModel)]="product.code" />
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <input pInputText type="text" placeholder="Product SKU" label="SKU" [(ngModel)]="product.sku" />
                        </div>
                        <div class="col-span-12 lg:col-span-2">
                            <input pInputText type="text" placeholder="Price" label="Price" [(ngModel)]="product.price" />
                        </div>
                        <div class="col-span-12 lg:col-span-2">
                            <!--<p-select [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Select a Country" class="w-full md:w-56">
                                <ng-template #selectedItem let-selectedOption>
                                    <div class="flex items-center gap-2">
                                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + selectedCountry.code.toLowerCase()" style="width: 18px" />
                                        <div>{{ selectedOption.name }}</div>
                                    </div>
                                </ng-template>
                                <ng-template let-country #item>
                                    <div class="flex items-center gap-2">
                                        <img src="https://primefaces.org/cdn/primeng/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" style="width: 18px" />
                                        <div>{{ country.name }}</div>
                                    </div>
                                </ng-template>
                            </p-select>-->
                        </div>
                        <div class="col-span-12">
                            <p-editor [(ngModel)]="product.description" [style]="{ height: '250px' }"></p-editor>
                        </div>
                        <div class="col-span-12">
                            <input pInputText type="text" placeholder="Product Picture URL" label="Product Picture URL" [(ngModel)]="product.imgURL" />
                        </div>
                        <div class="col-span-12 mt-4">
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
                        </div>
                    </div>
                </div>

                <div class="col-span-12 lg:col-span-4 flex flex-col gap-y-4">
                    <div class="border border-surface-200 dark:border-surface-700 rounded">
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
                        <span class="text-surface-900 dark:text-surface-0 font-bold block border-b border-surface-200 dark:border-surface-700 p-4">
                            Category
                        </span>
                        <div class="p-4">
                            <p-treeselect
                            [options]="categoryOptions"
                            [(ngModel)]="product.category"
                            selectionMode="single"
                            placeholder="Select a category"
                            optionLabel="label"
                            optionValue="key"
                            [filter]="true"
                            [showClear]="true"
                            styleClass="w-full" />
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
                    </div>

                    <div class="flex justify-between gap-4">
                        <button pButton pRipple severity="danger" outlined label="Discard" icon="pi pi-fw pi-trash"></button>
                        <button pButton pRipple label="Save" icon="pi pi-fw pi-check" (click)="onSave()"></button>
                    </div>
                </div>
            </p-fluid>
        </div>
    `,
    styles: `
        :host ::ng-deep .p-fileupload-header {
            display: none;
        }

        :host ::ng-deep .p-fileupload-file-list {
            display: none;
        }

        :host ::ng-deep .p-fileupload-content {
            height: 20rem;
        }

        :host ::ng-deep .p-progressbar {
            display: none;
        }
    `
})
export class NewProduct {
    @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

    text: string = '';
    categoryOptions: TreeNode[] = []; // Will be populated from API
    loadingCategories: boolean = true; // Optional: for showing a loader
 
    

    colorOptions: any[] = [
        { name: 'Black', background: 'bg-gray-900' },
        { name: 'Orange', background: 'bg-orange-500' },
        { name: 'Navy', background: 'bg-blue-500' }
    ];

    product: Product = {
        id: 0,
        name: '',
        price: '',
        code: '',
        sku: '',
        status: 0,
        tags: ['Nike', 'Sneaker'],
        category: '',
        colors: ['Blue'],
        stock: 'Sneakers',
        inStock: true,
        description: '',
        images: [],
        imgURL: ''
    };

    uploadedFiles: any[] = [];

    showRemove: boolean = false;
    constructor(private http: HttpClient, private messageService: MessageService) {
    }
    ngOnInit(): void {
        this.loadCategories();
    }
loadCategories(): void {
    this.loadingCategories = true;

    // Replace this URL with your actual API endpoint
    this.http.get<any[]>('https://localhost:7061/api/Categories') // Adjust endpoint as needed
      .subscribe({
        next: (apiCategories) => {
          this.categoryOptions = apiCategories;
          this.loadingCategories = false;
        },
        error: (err) => {
          console.error('Failed to load categories:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not load categories. Using fallback.'
          });
          // Optional: fallback to hardcoded data
          //this.categoryOptions = this.getFallbackCategories();
          this.loadingCategories = false;
        }
      });
    }



    onChipRemove(item: string) {
        this.product.tags = this.product.tags.filter((i) => i !== item);
    }

    onColorSelect(color: string) {
        this.product.colors.indexOf(color) == -1 ? this.product.colors.push(color) : this.product.colors.splice(this.product.colors.indexOf(color), 1);
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.product.images.push(file);
        }
    }

    onImageMouseOver(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name ? (el.nativeElement.style.display = 'flex') : null;
        });
    }

    onImageMouseLeave(file: Image) {
        this.buttonEl.toArray().forEach((el) => {
            el.nativeElement.id === file.name ? (el.nativeElement.style.display = 'none') : null;
        });
    }

    removeImage(event: any, file: Image) {
        event.stopPropagation();
        this.product.images = this.product.images.filter((i) => i !== file);
    }
    onSave(){
        //console.log("Product has been saved");
        // Replace 'https://your-backend-api.com/api/products' with your actual API endpoint
        //https://localhost:7061/api/Users/login
        this.http.post('https://localhost:7061/api/Products', this.product,{
        headers: { Authorization: `Bearer`, accept: '*/*', "Content-Type": 'application/json' }})
        .subscribe({
            next: (response) => {
            console.log('Product saved successfully:', response);
            this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product saved successfully!'
            });
            // Optionally reset the form or update UI
            this.product = {
                id: 0,
                name: '',
                price: '',
                code: '',
                sku: '',
                status: 0,
                tags: ['Nike', 'Sneaker'],
                category: '',
                colors: ['Blue'],
                stock: 'Sneakers',
                inStock: true,
                description: '',
                images: [],
                imgURL:''
            };
            },
            error: (error) => {
            console.error('Error saving product:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to save product. Please try again.'
            });
            }
        });
    }

}
