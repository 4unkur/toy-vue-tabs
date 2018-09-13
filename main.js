Vue.component('tabs', {
	template: `
<div>
	<div class="tabs">
	  <ul>
	  	<li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
	  		<a :href="tab.href" @click="selectTab(tab)">{{ tab.title }}</a>
		</li>
	  </ul>
	</div>
	<div class="tabs-content">
		<slot></slot>
	</div>
</div>`,
	data() {
		return {
			tabs: []
		}
	},
	created() {
		this.tabs = this.$children
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.title == selectedTab.title)
			})
		}
	}
})

Vue.component('tab', {
	template: `
<div v-show="isActive">
	<slot></slot>
</div>`,
	props: {
		title: {
			required: true
		},
		selected: {
			default: false
		}
	},
	data() {
		return {
			isActive: false
		}
	},
	mounted() {
		this.isActive = this.selected
	},
	computed: {
		href() {
			return '#' + this.title.toLowerCase().replace(/ /g, '-')
		}
	}
})

const app = new Vue({
	el: '#app'
})