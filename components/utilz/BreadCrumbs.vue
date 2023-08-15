<template>
    <div>
      <v-breadcrumbs :items="crumbs" class="text-capitalize text-caption pa-0 py-1">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      crumbs() {
        const pathArray = this.$route.path.split("/");
        pathArray.shift();
        const breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
          breadcrumbArray.push({
            to: breadcrumbArray[idx - 1]
              ? breadcrumbArray[idx - 1].to + "/" + path
              : "/" + path,
            title: path,
            disabled: false
          });
          return breadcrumbArray;
        }, []);
        return breadcrumbs;
      },
    },
  };
  </script>
  