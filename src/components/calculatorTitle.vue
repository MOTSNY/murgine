<!-- @author Mitskevich Yauheni -->
<template>
  <v-card-text>
    <v-row dense align="center">
      <v-col class="text-h6 font-weight-medium text--primary">
        {{titleText}}
      </v-col>
      <v-btn
        color="primary"
        text
        icon
        @click="goToBack"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  name: 'calculatorTitle',
  props: ['titleText'],
  methods: {
    goToBack () {
      this.$router.go(-1)
      // this.$store.dispatch('checkLicenseTime')
      // if (this.$store.getters.isLicenseExpiring) {
      //   this.$router.go(-1)
      // } else {
      //   this.$router.replace('/LicenseExpiring')
      // }
    }
  }
}
</script>

<style scoped>

</style>
