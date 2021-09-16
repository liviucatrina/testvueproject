<template>
  <div class="p-4">
    <div class="d-flex justify-content-end">
      <router-link to="/componenta" custom v-slot="{ navigate }">
        <button
          type="button"
          @click="navigate"
          class="btn-close"
          aria-label="Close"
        ></button>
      </router-link>
    </div>
    <div class="p-2">
      <form v-on:submit="onSubmit">
        <!-- use fieldset in order to disable all form content at once -->
        <fieldset v-bind:disabled="mode === 'view'">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="code"
              aria-describedby="emailHelp"
              v-model="item.code"
              v-bind:disabled="mode !== 'add'"
              placeholder="code"
              required
            />
            <label for="code" class="form-label">Code</label>
            <div id="codeHelp" class="form-text">Item code</div>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="item.name"
              placeholder="name"
              required
            />
            <label for="name" class="form-label">Name</label>
            <div id="nameHelp" class="form-text">Item's name</div>
          </div>
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="description"
              placeholder="description"
              v-model="item.description"
            />
            <label for="description" class="form-label">Description</label>
            <div id="descriptionHelp" class="form-text">Item details</div>
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="active"
              v-model="item.active"
            />
            <label class="form-check-label" for="active">Active</label>
          </div>
        </fieldset>
        <div class="d-flex justify-content-end" v-if="mode!='view'">
            <button type="submit" class="btn btn-primary m-1">Save</button>
            <router-link to="/componenta" custom v-slot="{ navigate }">
              <button
                type="button"
                @click="navigate"
                class="btn btn-secondary m-1"
              >
                Cancel
              </button>
            </router-link>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: ["itemId"],
  data: function () {
    return {
      records: this.$db,
      mode: "view",
      item: {},
    };
  },
  mountedOld() {
    const vm = this;
    console.log(vm.$router.currentRoute);
    console.log(vm);

    var itemId = "";
    if (vm.itemId.indexOf(";view") !== -1) {
      itemId = vm.itemId.replace(";view", "");
      this.mode = "view";
    } else {
      itemId = vm.itemId;
      if (itemId !== "") this.mode = "edit";
      else this.mode = "add";
    }

    if (this.mode != "add") {
      var dbItem = vm.records.find((p) => p.code === itemId);
      vm.item = JSON.parse(JSON.stringify(dbItem));
    }
  },
  mounted() {
    const vm = this;

    // determine the mode: view / edit / add
    var currentPath = vm.$router.currentRoute.path;
    var itemId = "";
    if (currentPath.indexOf("items/view") !== -1) {
      itemId = vm.itemId;
      this.mode = "view";
    } else if (currentPath.indexOf("items/edit") !== -1) {
      itemId = vm.itemId;
      this.mode = "edit";
    } else if (currentPath.indexOf("items/add") !== -1) {
      this.mode = "add";
    }

    // if it's not add create a copy in order to not perform direct object edit
    if (this.mode != "add") {
      var dbItem = vm.records.find((p) => p.code === itemId);
      vm.item = JSON.parse(JSON.stringify(dbItem));
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault(); // it prevent from page reload

      const vm = this;

      // short validation
      if (!vm.item.code && !vm.item.name) {
        console.error("item code is required, name is required");
        return;
      }

      if (vm.mode === "add") {
        vm.$db.push(vm.item);
      } else if (vm.mode === "edit") {
        var dbItem = vm.records.find((p) => p.code === vm.itemId);
        dbItem.name = vm.item.name;
        dbItem.description = vm.item.description;
        dbItem.active = vm.item.active;
      }

      this.$router.push({ path: "/componenta" });
    },
  },
};
</script>

<style scoped>
</style>