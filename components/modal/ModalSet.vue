
<template>

<div class="modal modal-blur fade" id="modal-setup" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-1 modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add your XMR wallet</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3 align-items-end">
              <div class="col-auto">
                <span class="bg-green text-white avatar">
                  <!-- Download SVG icon from http://tabler.io/icons/icon/plus -->
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  
                              fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-coin-monero">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11.414v4.586a1 1 0 0 0 1 1l4.66 .001a10 10 0 0 1 -17.32 0l4.66 -.001l.117 -.007a1 1 0 0 0 .883 -.993v-4.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -.083l2.293 -2.293zm2 -8.074a10 10 0 0 1 4.54 11.66h-4.54v-6c0 -.89 -1.077 -1.337 -1.707 -.707l-3.293 3.292l-3.293 -3.292l-.084 -.076c-.637 -.514 -1.623 -.07 -1.623 .783v6h-4.54a9.991 9.991 0 0 1 -.46 -3l.005 -.324a10 10 0 0 1 14.995 -8.336z" /></svg>
                  </span>
                
              </div>
              <div class="col">
                <label class="form-label">Monero Wallet</label>

                <input v-model="moneroWallet" type="text" class="form-control" />

              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Pools</label>
                  
                      

            </div>
            
          </div>
          <div class="modal-footer">

            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Add</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>




</script>

