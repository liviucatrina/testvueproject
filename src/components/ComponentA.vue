<template>
  <div>
    <div class="table-responsive m-2 p-2" id="items-table">
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'ItemAdd' }" custom v-slot="{ navigate }">
          <button type="button" @click="navigate" class="btn btn-primary">
            Add
          </button>
        </router-link>
      </div>
      <table
        class="table table-bordered table-striped table-hover table-sm mt-1"
      >
        <thead class="table-light text-dark">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>
              <div class="d-flex justify-content-center">Active</div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in records" v-bind:key="item.code">
            <td class="align-middle">
              {{ item.code }}
            </td>
            <td class="align-middle">
              {{ item.name }}
            </td>
            <td class="align-middle">
              {{ item.description }}
            </td>
            <td class="align-middle">
              <div class="d-flex justify-content-center">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    v-model="item.active"
                    disabled
                  />
                </div>
              </div>
            </td>
            <td class="align-middle" style="width: 20%">
              <div class="d-flex justify-content-center">
                <router-link
                  :to="{
                    name: 'ItemView',
                    params: { itemId: `${item.code}` },
                  }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button
                    type="button"
                    @click="navigate"
                    class="btn btn-link link-primary"
                  >
                    View
                  </button>
                </router-link>
                <router-link
                  :to="{
                    name: 'ItemEdit',
                    params: { itemId: `${item.code}` },
                  }"
                  custom
                  v-slot="{ navigate }"
                >
                  <button
                    type="button"
                    @click="navigate"
                    class="btn btn-link link-warning"
                  >
                    Edit
                  </button>
                </router-link>
                <button
                  type="button"
                  class="btn btn-link link-danger"
                  v-on:click="deleteItem(`${item.code}`)"
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="btn btn-link link-danger"
                  v-on:click="confirmDeleteItem(`${item.code}`)"
                >
                  Delete bs-m
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- modal -->
    <div v-if="showModal">
      <div class="modal-route"></div>
      <div id="item-modal-content" class="shadow">
        <router-view></router-view>
      </div>
    </div>
    <!-- end modal -->

    <!-- confirm -->
    <modal-confirm
      v-if="showConfirmDelete"
      v-bind:confirm-title="confirmTitle"
      v-bind:confirm-content="confirmContent"
      v-bind:confirm-item-id="itemCodeToDelete"
      @closeConfirmModalEvent="closeConfirmModalEvent"
    ></modal-confirm>
    <!-- end confirm -->
  </div>
</template>

<script>
import ModalConfirm from "./ModalConfirm.vue";

export default {
  name: "ComponentA",
  components: {
    ModalConfirm,
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (newVal) {
        this.showModal = newVal.meta && newVal.meta.showModal;
      },
    },
  },
  data: function () {
    return {
      records: this.$db,
      showModal: false,
      showConfirmDelete: false,
      itemCodeToDelete: null,
      confirmTitle: 'Please confirm',
      confirmContent: 'Are you sure?'
    };
  },
  methods: {
    deleteItem(itemCode) {
      var strMsg =
        "Are you sure you want to delete item with code " + itemCode + "?";
      if (confirm(strMsg) == true) {
        var indexToRemove = this.$db.findIndex((p) => p.code === itemCode);
        this.$db.splice(indexToRemove, 1);
      }
    },
    confirmDeleteItem(itemCode) {
      this.confirmTitle = "Delete item";
      this.confirmContent =
        "Are you sure you want to delete item with code " + itemCode + "?";
      this.itemCodeToDelete = itemCode;
      this.showConfirmDelete = true;
    },
    closeConfirmModalEvent(result, itemCode) {
      this.showConfirmDelete = false;
      if (result === "ok") {
        var indexToRemove = this.$db.findIndex((p) => p.code === itemCode);
        this.$db.splice(indexToRemove, 1);
      }
    },
  },
};
</script>

<style scoped>
.modal-route {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: lightgray;
  opacity: 0.5;
}

#item-modal-content {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white !important;
  opacity: 1;
}
</style>