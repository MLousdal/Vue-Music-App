const vm = Vue.createApp({
  data() {
    return {
      firstName: "Bob",
      middleName: "",
      lastName: "Doe",
      url: "https://google.com",
      raw_url: `<a href="https://google.com" target="_blank">Google</a>`,
      age: 20,
    };
  },
  methods: {
    increment() {
      this.age++;
    },
    decrement() {
      this.age--;
    },
    updateLastName(e, msg) {
      this.lastName = e.target.value;
      // console.log(msg);
    },
    updateMiddleName(e) {
      this.middleName = e.target.value;
    },
  },
  computed: {
    fullName() {
      console.log("fullname computed");
      return `${this.firstName} ${this.middleName} ${this.lastName.toUpperCase()}`;
    },
  },
  watch: {
    age(newVal, oldVal) {
      setTimeout(() => {
        this.age = 20
      }, 3000)
    }
  }
}).mount("#app");
