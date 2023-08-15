<script setup lang="ts">
//this is how we declare our props
defineProps({
  name: String,
  telephone_no: String,
  delivery_account_no: String,
  address_line_1: String,
  address_line_2: String,
  address_line_3: String,
  address_line_4: String,
  postcode: String,
  email: String,
});
</script>

<template>
  <v-container>
    <v-card variant="outlined">
      <div id="customerDetails ">
        <v-card-title>
          <v-icon icon="mdi-account"></v-icon>
          {{ name }}
        </v-card-title>

        <v-divider />
        <!-- v-if="telephone_no" -->
        <v-card-title>
          <v-icon icon="mdi-phone"></v-icon>
          {{ telephone_no }}
        </v-card-title>
        <v-divider />
        <v-card-title>
          <v-icon icon="mdi-email-fast-outline"></v-icon>
          {{ email }}
        </v-card-title>

        <v-divider />

        <v-card-title>
          <v-icon icon="mdi-truck-delivery"></v-icon>
          Delivery Number: {{ delivery_account_no }}
        </v-card-title>
      </div>

      <v-divider />
      <v-card-title color="primary">
        <div id="location">
          <v-icon icon="mdi-map-marker"> </v-icon>
          {{ address_line_1 }}
          <br />
          {{ address_line_2 }}
          <br />
          {{ address_line_3 }}
          {{ address_line_4 }}
          <br />
          <v-divider />
          <v-icon icon="mdi-home-city"> </v-icon>
          Postcode: {{ postcode }}
        </div>
      </v-card-title>
    </v-card>
  </v-container>
</template>
