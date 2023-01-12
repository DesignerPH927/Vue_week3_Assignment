


const products = {
  data() {
    return {
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'zack_p',
      remoteData: [],     
      pModal: '',
      delModal: '',
      isNew: false,       // 判別 Modal 資料的新舊
      tempProduct: {      // 編輯新、舊資料
        imagesUrl: [],
      },    
    };
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)zackII_0112\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${this.apiUrl}/api/user/check`)
        .then(() => {
          this.getRemoteData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'index.html';
        })
    },
    getRemoteData() {
      axios(`${this.apiUrl}/api/${this.apiPath}/admin/products/all`)
        .then((res) => {
          // console.log(res.data.products);
          this.remoteData = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    }, 
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }
      axios[http](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          this.pModal.hide();
          this.getRemoteData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    deleteProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url)
        .then((res) => {
          alert(res.data.message);
          this.delModal.hide();
          this.getRemoteData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openModal(isNew, item) {
      // console.log(isNew, item);
      if (isNew === 'new') {        
        // 由於新增資料與編輯資料的Modal都用一樣的pModal，
        // 故內部宣告變數必須與舊資料的imagesUrl一樣，不然
        // 舊資料圖片不會顯示
        this.tempProduct = {
          imagesUrl: [],          
        };
        this.isNew = true;
        this.pModal.show();
      }else if (isNew === 'edit') {
        this.tempProduct = {...item};
        this.isNew = false;
        this.pModal.show();
      }else if (isNew === 'delete') {
        this.tempProduct = {...item};
        this.delModal.show();
      }      
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    }
  },
  mounted() {
    this.pModal = new bootstrap.Modal(this.$refs.pModal);
    this.delModal = new bootstrap.Modal(this.$refs.delModal);
    this.checkAdmin();
  },
}

Vue.createApp(products).mount('#app');