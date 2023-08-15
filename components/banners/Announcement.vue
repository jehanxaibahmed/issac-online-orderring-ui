<template>
  <v-card color="#ecf1f8" flat class="ADavidCard">
    <v-card-text class="">
      <v-row align="center" no-gutters class="py-4">
        <v-col class="grow" style="font-size: 1.5em">
          <v-icon size="large" color="primary" class="mr-2"
            >mdi-information</v-icon
          >
          <span
            v-html="
              'Please call Customer Excellence to hear about our daily special offers on: 0330 333 4441'
            " />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: function () {
    return {};
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    style() {
      const Style = {
        background: this.$vuetify.theme.themes[this.theme].primary,
        color: "#FFF",
        "z-index": 0,
        top: "0px",
      };
      return Style;
    },
  },
};
</script>

<style lang="sass">
.announcementMessage a
  color: #ffffff !important
  text-decoration: underline
  font-weight: bold
</style>
