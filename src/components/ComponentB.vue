<template>
  <div class="d-flex h-100">
    <!-- sidebar -->
    <div class="col-3">
      <div class="d-flex flex-column">
        <router-link :to="{ name: 'B1' }" custom v-slot="{ navigate }">
          <button
            type="button"
            @click="navigate"
            class="btn btn-light border m-1"
          >
            Link B1
          </button>
        </router-link>
        <router-link :to="{ name: 'B2' }" custom v-slot="{ navigate }">
          <button
            type="button"
            @click="navigate"
            class="btn btn-light border m-1"
          >
            Link B2
          </button>
        </router-link>
      </div>
    </div>
    <!-- end sidebar -->

    <!-- main -->
    <div class="col-9">
      <router-view></router-view>
    </div>
    <!-- end main -->
  </div>
</template>

<script>
export default {
  name: "ComponentB",
};
</script>