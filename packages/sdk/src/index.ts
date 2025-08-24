export class FulfillXClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(options: { baseUrl: string; apiKey?: string }) {
    this.baseUrl = options.baseUrl;
    this.apiKey = options.apiKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (this.apiKey) {
      headers.Authorization = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Orders API
  orders = {
    list: (params?: any) => this.request("/orders", { method: "GET" }),
    get: (id: string) => this.request(`/orders/${id}`, { method: "GET" }),
    create: (data: any) =>
      this.request("/orders", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      this.request(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    duplicate: (id: string, quantity = 1) =>
      this.request(`/orders/${id}/duplicate`, {
        method: "POST",
        body: JSON.stringify({ quantity }),
      }),
    addNote: (id: string, content: string, mentions: string[] = []) =>
      this.request(`/orders/${id}/notes`, {
        method: "POST",
        body: JSON.stringify({ content, mentions }),
      }),
  };

  // Shipping API
  shipping = {
    getRates: (data: any) =>
      this.request("/shipping/rates", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    purchaseLabel: (data: any) =>
      this.request("/shipping/labels", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    voidLabel: (id: string, reason?: string) =>
      this.request(`/shipping/labels/${id}/void`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      }),
    trackShipment: (trackingNumber: string) =>
      this.request(`/shipping/tracking/${trackingNumber}`, { method: "GET" }),
  };

  // Inventory API
  inventory = {
    skus: {
      list: (params?: any) =>
        this.request("/inventory/skus", { method: "GET" }),
      get: (id: string) =>
        this.request(`/inventory/skus/${id}`, { method: "GET" }),
      create: (data: any) =>
        this.request("/inventory/skus", {
          method: "POST",
          body: JSON.stringify(data),
        }),
      update: (id: string, data: any) =>
        this.request(`/inventory/skus/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
        }),
    },
    levels: {
      list: (warehouseId?: string) =>
        this.request("/inventory/levels", {
          method: "GET",
          ...(warehouseId && {
            headers: { "X-Warehouse-ID": warehouseId },
          }),
        }),
      adjust: (data: any) =>
        this.request("/inventory/adjust", {
          method: "POST",
          body: JSON.stringify(data),
        }),
    },
    reservations: {
      create: (data: any) =>
        this.request("/inventory/reservations", {
          method: "POST",
          body: JSON.stringify(data),
        }),
      release: (id: string) =>
        this.request(`/inventory/reservations/${id}/release`, {
          method: "POST",
        }),
    },
  };

  // Analytics API
  analytics = {
    profit: {
      overview: (params?: any) =>
        this.request("/analytics/profit", { method: "GET" }),
      bySku: (params?: any) =>
        this.request("/analytics/profit/sku", { method: "GET" }),
      byChannel: (params?: any) =>
        this.request("/analytics/profit/channel", { method: "GET" }),
      export: (format = "csv") =>
        this.request(`/analytics/export?format=${format}`, {
          method: "GET",
        }),
    },
  };

  // Rules API
  rules = {
    list: () => this.request("/rules", { method: "GET" }),
    get: (id: string) => this.request(`/rules/${id}`, { method: "GET" }),
    create: (data: any) =>
      this.request("/rules", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      this.request(`/rules/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    test: (id: string, testData: any) =>
      this.request(`/rules/${id}/test`, {
        method: "POST",
        body: JSON.stringify(testData),
      }),
    delete: (id: string) => this.request(`/rules/${id}`, { method: "DELETE" }),
  };
}
