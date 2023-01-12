


const app = {
  data() {
    return {
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'zack_p',
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      axios.post(`${this.apiUrl}/admin/signin`, this.user)
        .then((res) => {
          console.log(res.data);
          const { token, expired } = res.data;
          // console.log(token,expired);
          document.cookie = `zackII_0112=${token}; expires=${new Date(expired)};`;
          window.location = 'products.html';
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }
  }, 
}


Vue.createApp(app).mount('#app');