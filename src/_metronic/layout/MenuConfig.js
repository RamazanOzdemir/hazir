export default {
  header: {
    self: {},
    items: [

      // {
      //   title: "Components",
      //   root: true,
      //   alignment: "left",
      //   toggle: "click",
      //   submenu: [
      //     {
      //       title: "React Bootstrap",
      //       bullet: "dot",
      //       icon: "flaticon-web",
      //       submenu: [
      //
      //
      //       ]
      //     }
      //   ]
      // },

    ]
  },
  aside: {
    self: {},
    items: [
       {
        title: 'Dashboard',
        page: 'dashboard',
        icon: 'flaticon-home'
       },
       {
        title: "Products",
        bullet: "dot",
        icon: "flaticon-symbol",
        submenu: [
          {
            title: "Add Product",
            page: 'product/add-product',
            bullet: "dot",
          },
          {
            title: "Add Product Portion",
            page: 'product/add-roduct-portion',
            bullet: "dot",  
          },
          {
            title: "Add Product Portion Price",
            page: "product/add-product-portion-price",
            bullet: "dot",
          },
          {
            title: "Batch Price Change",
            page: "product/batch-price-change",
            bullet: "dot",
          },
          {
            title: "Batch Product Add",
            page: "product/batch-product-add",
            bullet: "dot",
          },
        ]
      },
       {
        title: "Products2",
        bullet: "dot",
        icon: "flaticon-symbol",
        submenu: [
          {
            title: "Add Product Modal",
            page: 'product2/add-product-modal',
            bullet: "dot",
          },
          {
            title: "Add Product Portion Modal",
            page: 'product2/add-product-portion-modal',
            bullet: "dot",
          },
          {
            title: "Add Product Form",
            page: 'product2/add-product-form',
            bullet: "dot",  
          },
          {
            title: "Add Product Other Page",
            page: "product2/add-product-other",
            bullet: "dot",
          },
          {
            title: "Product List",
            page: "product2/product-list",
            bullet: "dot",
          },
        ]
      },
       {
        title: "Products3",
        bullet: "dot",
        icon: "flaticon-symbol",
        submenu: [
          {
            title: "Products",
            page: "product3/products",
            bullet: "dot",
          },
          {
            title: "Product Tag Editor",
            page: "product3/product-tag-editor",
            bullet: "dot",
          },
        ]
      },
      
      // {
      //   root: true,
      //   title: "Documentation",
      //   bullet: "dot",
      //   icon: "flaticon2-file-1",
      //   submenu: [
      //     { title: "Quick Start", page: "docs/quick-start" },
      //     { title: "Overview", page: "docs/overview" },
      //     { title: "Deployment", page: "docs/deployment" },
      //     { title: "Internationalization", page: "docs/i18n" },
      //     { title: "Mock Backend", page: "docs/mock-backend" },
      //     { title: "Create a Page", page: "docs/create-a-page" }
      //   ]
      // },
      {
        title: "Menus",
        bullet: "line",
        icon: "flaticon-menu-2",
        submenu: [
          {
            title: "Add Menu",
            page: "menus/add-menu",
            bullet: "line",
          },
          {
            title: "Add Menu Category",
            page: "menus/add-menu-category",
            bullet: "line",
          },
          {
            title: "Select Product for Menu Category",
            page: "menus/select-product-for-menu-category",
            bullet: "line",
          },
        ]
      },
      {
        title: "Users",
        //root: true,
        bullet: "dot",
        icon: "flaticon-users",
        submenu: [
          {
            title: "Add SambaPOS User Group",
            page: "add-sambaPOS-user-group",
            bullet: "dot",
          },
          {
            title: "Add SambaPOS User Group Authority",
            page: "add-sambaPOS-user-group-authority",
            bullet: "dot",  
          },
          {
            title: "Add SambaPOS User",
            page: "add-sambaPOS-user",
            bullet: "dot",
          },
          {
            title: "Add Neptune User Group",
            page: "add-neptune-user-group",
            bullet: "dot",
          },
          {
            title: "Add Neptune User Group Authorit",
            page: "add-neptune-user-group-authority",
            bullet: "dot",
          },
          {
            title: "Add Neptune User",
            page: "add-neptune-user",
            bullet: "dot",
          },
        ]
      },
      {
        title: "Tickets",
        //root: true,
        bullet: "dot",
        icon: "flaticon-coins",
        submenu: [
          {
            title: "Add Order Tag",
            page: "add-order-tag",
            bullet: "dot",
          },
          {
            title: "Add Ticket Tag",
            page: "add-ticket-tag",
            bullet: "dot",  
          },
          {
            title: "Add Price Tag",
            page: "add-price-tag",
            bullet: "dot",
          },
        ]
      },
      {
        title: "Entities",
        //root: true,
        bullet: "dot",
        icon: "flaticon-graphic",
        submenu: [
          {
            title: "Add Entity Screen",
            page: "add-entity-screen",
            bullet: "dot",
          },
          {
            title: "Add Entity",
            page: "add-entity",
            bullet: "dot",  
          },
        ]
      },
      {
        title: "Ordering System",
        icon: "flaticon-graphic",
        bullet: "dot",
        submenu: [
          {
            title: "Order List",
            page: "order-list",
            bullet: "dot",
          },
          {
            title: "Add Order",
            page: "add-order",
            bullet: "dot",
          },
        ]
      },
      {
        title: "Branches",
        //root: true,
        bullet: "dot",
        icon: "flaticon-map",
        submenu: [
          {
            title: "Add Branch",
            page: "add-branch",
            bullet: "dot",
          },
          {
            title: "Branch Tag",
            page: "branch-tag",
            bullet: "dot",  
          },
        ]
      },
      {
        title: "Inventory",
        //root: true,
        bullet: "dot",
        icon: "flaticon-computer",
        submenu: [
          {
            title: "Track Inventories",
            bullet: "dot",
          },
          {
            title: "Add Inventory Product",
            bullet: "dot",  
          },
          {
            title: "Add Receipt",
            bullet: "dot",
          },
          {
            title: "Add Inventory",
            bullet: "dot",
          },
        ]
      },
      {
        title: "Send Updates",
        //root: true,
        bullet: "dot",
        icon: "flaticon-presentation-1",
        submenu: [
          {
            title: "Send Data to Branches",
            bullet: "dot",
          },
        ]
      },
      {
        title: "Settings",
        //root: true,
        bullet: "dot",
        icon: "flaticon-cogwheel",
        submenu: [
          {
            title: "Shared Entity Select",
            bullet: "dot",
          },
        ]
      },
    ]
  }
};
