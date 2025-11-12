import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppMenuitem} from './app.menuitem';

@Component({
    selector: '[app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    ngOnInit(): void {
        //const userRoles = this.authService.getUserRoles();
        //this.model = this.menuService.getMenuItems(userRoles);
        //console.log("menu printing");

        let bctoken = localStorage.getItem('bctoken');
           


         console.log("Print roles");
        // console.log(roles);
        if (bctoken) {
        try {
            // Parse the JSON string into an object
            const bctokenJSON = JSON.parse(bctoken);
            console.log(bctokenJSON); // This will log the actual object
            this.model = this.filterMenuByRoles(this.model,bctokenJSON.roles);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
        } else {
            console.log('No bctoken found in localStorage');
        }
        //let userRoles: string[] = ['GuestUser'];

        //this.model = this.filterMenuByRoles(this.model,userRoles);
    }
    model1: any[] = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Marketing',
                    icon: 'pi pi-fw pi-gauge',
                    routerLink: ['/'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'E-Commerce',
                    icon: 'pi pi-fw pi-warehouse',
                    routerLink: ['/dashboard-ecommerce'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Banking',
                    icon: 'pi pi-fw pi-building-columns',
                    routerLink: ['/dashboard-banking'],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        }
    ];
    model: any[] = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Marketing',
                    icon: 'pi pi-fw pi-gauge',
                    routerLink: ['/'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'E-Commerce',
                    icon: 'pi pi-fw pi-warehouse',
                    routerLink: ['/dashboard-ecommerce'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Banking',
                    icon: 'pi pi-fw pi-building-columns',
                    routerLink: ['/dashboard-banking'],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'Apps',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Blog',
                    icon: 'pi pi-fw pi-comment',
                    items: [
                        {
                            label: 'List',
                            icon: 'pi pi-fw pi-image',
                            routerLink: ['/apps/blog/list'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Detail',
                            icon: 'pi pi-fw pi-list',
                            routerLink: ['/apps/blog/detail'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Edit',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/apps/blog/edit'],
                            roles: ['SuperAdmin']
                        }
                    ]
                },
                {
                    label: 'Chat',
                    icon: 'pi pi-fw pi-comments',
                    routerLink: ['/apps/chat'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Files',
                    icon: 'pi pi-fw pi-folder',
                    routerLink: ['/apps/files'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Mail',
                    icon: 'pi pi-fw pi-envelope',
                    items: [
                        {
                            label: 'Inbox',
                            icon: 'pi pi-fw pi-inbox',
                            routerLink: ['/apps/mail/inbox'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Compose',
                            icon: 'pi pi-fw pi-pencil',
                            routerLink: ['/apps/mail/compose'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Detail',
                            icon: 'pi pi-fw pi-comment',
                            routerLink: ['/apps/mail/detail/1000'],
                            roles: ['SuperAdmin']
                        }
                    ]
                },
                {
                    label: 'Task List',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: ['/apps/tasklist'],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'UI Kit',
            icon: 'pi pi-fw pi-star-fill',
            items: [
                {
                    label: 'Form Layout',
                    icon: 'pi pi-fw pi-id-card',
                    routerLink: ['/uikit/formlayout'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Input',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: ['/uikit/input'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Button',
                    icon: 'pi pi-fw pi-box',
                    routerLink: ['/uikit/button'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Table',
                    icon: 'pi pi-fw pi-table',
                    routerLink: ['/uikit/table'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/uikit/list'],
                    roles: ['GuestUser','SuperAdmin']
                },
                {
                    label: 'Categories',
                    icon: 'pi pi-fw pi-share-alt',
                    routerLink: ['/uikit/tree'],
                    roles: ['GuestUser','SuperAdmin']
                },
                {
                    label: 'Panel',
                    icon: 'pi pi-fw pi-tablet',
                    routerLink: ['/uikit/panel'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Overlay',
                    icon: 'pi pi-fw pi-clone',
                    routerLink: ['/uikit/overlay'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Media',
                    icon: 'pi pi-fw pi-image',
                    routerLink: ['/uikit/media'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Menu',
                    icon: 'pi pi-fw pi-bars',
                    routerLink: ['/uikit/menu'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Message',
                    icon: 'pi pi-fw pi-comment',
                    routerLink: ['/uikit/message'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'File',
                    icon: 'pi pi-fw pi-file',
                    routerLink: ['/uikit/file'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Chart',
                    icon: 'pi pi-fw pi-chart-bar',
                    routerLink: ['/uikit/charts'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Timeline',
                    icon: 'pi pi-fw pi-calendar',
                    routerLink: ['/uikit/timeline'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Misc',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: ['/uikit/misc'],
                    roles: ['SuperAdmin']
                }
            ]
        },
        {separator: true},
        {
            label: 'Prime Blocks',
            icon: 'pi pi-fw pi-prime',
            items: [
                {
                    label: 'Free Blocks',
                    icon: 'pi pi-fw pi-eye',
                    routerLink: ['/blocks'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'All Blocks',
                    icon: 'pi pi-fw pi-globe',
                    url: ['https://primeblocks.org'],
                    target: '_blank',
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'Utilities',
            icon: 'pi pi-fw pi-compass',
            items: [
                {
                    label: 'Figma',
                    icon: 'pi pi-fw pi-pencil',
                    url: ['https://www.figma.com/design/eMNbyxsMp3H0PQbMyyGK77/Preview-%7C-Poseidon?node-id=0-1&t=wJRSplRnKvjqju9S-1'],
                    target: '_blank',
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    routerLink: ['/landing'],
                    roles: ['GuestUser','SuperAdmin']
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/landing/login'],
                            roles: ['SuperAdmin']
                        },

                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            routerLink: ['/landing/error'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            routerLink: ['/landing/access'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Register',
                            icon: 'pi pi-fw pi-user-plus',
                            routerLink: ['/landing/register'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Forgot Password',
                            icon: 'pi pi-fw pi-question',
                            routerLink: ['/landing/forgot-password'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'New Password',
                            icon: 'pi pi-fw pi-cog',
                            routerLink: ['/landing/new-password'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Verification',
                            icon: 'pi pi-fw pi-envelope',
                            routerLink: ['/landing/verification'],
                            roles: ['SuperAdmin']
                        },
                        {
                            label: 'Lock Screen',
                            icon: 'pi pi-fw pi-eye-slash',
                            routerLink: ['/landing/lock-screen'],
                            roles: ['SuperAdmin']
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    routerLink: ['/pages/crud'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Invoice',
                    icon: 'pi pi-fw pi-dollar',
                    routerLink: ['/pages/invoice'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'About Us',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/pages/aboutus'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Help',
                    icon: 'pi pi-fw pi-question-circle',
                    routerLink: ['/pages/help'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Oops',
                    icon: 'pi pi-fw pi-sign-in',
                    routerLink: ['/landing/oops'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Not Found',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    routerLink: ['/pages/notfound'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Empty',
                    icon: 'pi pi-fw pi-circle-off',
                    routerLink: ['/pages/empty'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'FAQ',
                    icon: 'pi pi-fw pi-question',
                    routerLink: ['/pages/faq'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Contact Us',
                    icon: 'pi pi-fw pi-phone',
                    routerLink: ['/landing/contact'],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'E-Commerce',
            icon: 'pi pi-fw pi-wallet',
            items: [
                {
                    label: 'Product Overview',
                    icon: 'pi pi-fw pi-image',
                    routerLink: ['/ecommerce/product-overview'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Products',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/ecommerce/product-list'],
                    roles: ['GuestUser','SuperAdmin']
                },
                {
                    label: 'Add Product',
                    icon: 'pi pi-fw pi-plus',
                    routerLink: ['/ecommerce/new-product'],
                    roles: ['GuestUser','SuperAdmin']
                },
                {
                    label: 'Shopping Cart',
                    icon: 'pi pi-fw pi-shopping-cart',
                    routerLink: ['/ecommerce/shopping-cart'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Checkout Form',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: ['/ecommerce/checkout-form'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Order History',
                    icon: 'pi pi-fw pi-history',
                    routerLink: ['/ecommerce/order-history'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Order Summary',
                    icon: 'pi pi-fw pi-file',
                    routerLink: ['/ecommerce/order-summary'],
                    roles: ['SuperAdmin']
                }
            ]
        },
        {separator: true},
        {
            label: 'User Management',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'List',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/profile/list'],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Create',
                    icon: 'pi pi-fw pi-plus',
                    routerLink: ['/profile/create'],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'Hierarchy',
            icon: 'pi pi-fw pi-align-left',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.1.1',
                                    icon: 'pi pi-fw pi-align-left'
                                },
                                {
                                    label: 'Submenu 1.1.2',
                                    icon: 'pi pi-fw pi-align-left'
                                },
                                {
                                    label: 'Submenu 1.1.3',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 1.2.1',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        }
                    ],
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-align-left',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.1.1',
                                    icon: 'pi pi-fw pi-align-left'
                                },
                                {
                                    label: 'Submenu 2.1.2',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-align-left',
                            items: [
                                {
                                    label: 'Submenu 2.2.1',
                                    icon: 'pi pi-fw pi-align-left'
                                }
                            ]
                        }
                    ],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        },
        {separator: true},
        {
            label: 'Start',
            icon: 'pi pi-fw pi-download',
            items: [
                {
                    label: 'Buy Now',
                    icon: 'pi pi-fw pi-shopping-cart',
                    url: 'https://www.primefaces.org/store',
                    roles: ['SuperAdmin']
                },
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-info-circle',
                    routerLink: ['/documentation'],
                    roles: ['SuperAdmin']
                }
            ],
            roles: ['SuperAdmin']
        }
    ];
    private filterMenuByRoles(items: any[], userRoles: string[]): any[] {
        return items
        .filter(item => {
            if (item.separator) return true; // Keep separators
            if (!item.roles || item.roles.length === 0) return true; // No roles specified, allow all
            return item.roles.some((role: string) => userRoles.includes(role));
        })
        .map(item => {
            if (item.items) {
            return {
                ...item,
                items: this.filterMenuByRoles(item.items, userRoles)
            };
            }
            return item;
        });
    }
    // private filterMenuByRoles(items: any[], userRoles: string[]): any[] {
    //     return items
    //     .filter(item => {
    //         if (item.separator) return true; // Keep separators
    //         if (!item.roles) return true; // No roles specified, allow all
    //         return item.roles.some(role => userRoles.includes(role));
    //     });
    //     // .map(item => {
    //     //     if (item.items) {
    //     //     return {
    //     //         ...item,
    //     //         items: this.filterMenuByRoles(item.items, userRoles)
    //     //     };
    //     //     }
    //     //     return item;
    //     // });
    // }
}
