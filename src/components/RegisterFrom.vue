<template>
  <div
    class="text-white text-center font-bold p-5 mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.name') }}</label>
      <vee-field
        name="name"
        type="text"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        :placeholder="`${$t('auth.enter')} ${$t('auth.name')}`"
      />
      <ErrorMessage class="text-red-600" name="name" as="p" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        :placeholder="`${$t('auth.enter')} email`"
      />
      <ErrorMessage class="text-red-600" name="email" as="p" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.age') }}</label>
      <vee-field
        name="age"
        type="number"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
      />
      <ErrorMessage class="text-red-600" name="age" as="p" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.password') }}</label>
      <vee-field name="password" :bails="false" #default="{ field, errors }">
        <input
          type="password"
          class="
            block
            w-full
            py-1.5
            px-3
            text-gray-800
            border border-gray-300
            transition
            duration-500
            focus:outline-none focus:border-black
            rounded
          "
          :placeholder="$t('auth.password')"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.conf_password') }}</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        :placeholder="$t('auth.conf_password')"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" as="p" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.country') }}</label>
      <vee-field
        as="select"
        name="country"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" as="p" />
    </div>
    <!-- Listener / Artist -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.listener') }} {{ $t('auth.or') }} {{ $t('auth.artist') }}?</label>
      <vee-field
        as="select"
        name="lis_art"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
      >
        <option value="Listener">{{ $t('auth.listener') }}</option>
        <option value="Artist">{{ $t('auth.artist') }}</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="lis_art" as="p" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label"
        ><a href="#">{{ $t('register.TOS') }}</a></i18n-t
      >
      <ErrorMessage class="text-red-600" name="tos" as="p" />
    </div>
    <button
      type="submit"
      class="
        block
        w-full
        bg-purple-600
        text-white
        py-1.5
        px-3
        rounded
        transition
        hover:bg-purple-700
      "
      :disabled="reg_in_submission"
    >
      {{ $t('submit') }}
    </button>
  </vee-form>
</template>

<script>
// import { auth, usersCollection } from '@/includes/firebase'

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:6|max:32',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        lis_art: 'required',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
        lis_art: 'Listener',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created',
    }
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'Please wait! Your account is being create...'

      try {
        await this.$store.dispatch('register', values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg =
          'An unexpected error occurred. Please try again later'
        return
      }

      this.reg_alert_variant = 'bg-green-500'
      this.reg_alert_msg = 'Success! Your account has been created!'
      window.location.reload()
    },
  },
}
</script>

<style>
</style>