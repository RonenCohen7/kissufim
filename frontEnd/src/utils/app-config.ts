class AppConfig {

    public baseUrl = import.meta.env.VITE_API_URL;

    public readonly authUrl = this.baseUrl + "auth"

    public readonly productUrl = this.baseUrl + "products"

    public readonly adminProductUrl = this.baseUrl + "/admin/products";

    public readonly ordersUrl = this.baseUrl + "/orders";
    public readonly adminOrderUrl = this.baseUrl + "/admin/orders";
}


export const appConfig = new AppConfig();