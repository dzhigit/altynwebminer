<template>
<div class="collapse navbar-collapse" id="navbar-menu">
			<div class="navbar">
				<div class="container-xl">
					<div class="row flex-fill align-items-center">
						<div class="col">
<ul class="navbar-nav">
		<li class="nav-item active">
			<a class="nav-link" href="./">
				
				<span class="nav-link-title">
					{{ $t('home') }}
				</span>
			</a>
		</li>
</ul>
						</div>
						<div class="col-2 d-none d-xxl-block">
<div class="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
	
	<Lang/>
	
	</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>


<script setup>
import Lang from "~/components/widgets/Lang.vue";
</script>
