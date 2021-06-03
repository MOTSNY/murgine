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
        @click="$router.go(-1)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  name: 'calculatorTitle',
  props: ['titleText']
}
</script>

<style scoped>

</style>
