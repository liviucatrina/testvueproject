<template>
  <div>
    <div class="app-backdrop"></div>
    <div
      class="modal d-inline"
      id="confirmModal"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog shadow">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalLabel">
              {{ confirmTitle }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeConfirmModal(null, null)"
            ></button>
          </div>
          <div class="modal-body">
            {{ confirmContent }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="closeConfirmModal('ok', confirmItemId)"
            >
              OK
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeConfirmModal('cancel', null)"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirm",
  props: ["confirmTitle", "confirmContent", "confirmItemId"],
  methods: {
    closeConfirmModal(result) {
      this.confirmVisible = false;
      this.$emit("closeConfirmModalEvent", result, this.confirmItemId);
    },
  },
};
</script>
