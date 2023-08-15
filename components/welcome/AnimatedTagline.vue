<script setup lang="ts">
const animatedTagline = ref("");
const animatedTaglineTrigger = ref(false);
const props = defineProps({
  nonAnimatedString: String || undefined,
  animatedStringOptions: Array<String>,
  animationSpeed: Number,
});
let option = 0;
function animateTagline() {
  if (!props.animatedStringOptions || !props.animationSpeed) return;
  if (option >= props.animatedStringOptions.length - 1) option = 0;
  animatedTagline.value = `${props.animatedStringOptions[option]}`;
  animatedTaglineTrigger.value = true;
  option++;
  setTimeout(
    () => (animatedTaglineTrigger.value = false),
    props.animationSpeed - 250
  );
  setTimeout(animateTagline, props.animationSpeed);
}
animateTagline();
</script>
<!--animated tagline idea here, 
TODO: stop this from happening if it isnt visible on the customers screen to stop it potentially moving the elements up and down 
TODO: Look more like this https://codepen.io/alvarotrigo/pen/GREdmKW
-->
'text-wrap', 'text-lg-h1', // large screen sizes 'text-md-h2', // medium screen
sizes 'text-sm-h3', //small screen size 'text-h4', //extra small screen size

<template>
  <VLazy>
    <h3
      :class="[
        'text-medium-emphasis',
        'text-wrap',
        'text-lg-h3', // large screen sizes
        'text-md-h4', // medium screen sizes
        'text-sm-h5', //small screen size
        'text-h6', //extra small screen size
      ]">
      {{ nonAnimatedString }}
      <VScrollXTransition>
        <span v-show="animatedTaglineTrigger">
          {{ "  " + animatedTagline }}
        </span>
      </VScrollXTransition>
    </h3></VLazy
  >
</template>
