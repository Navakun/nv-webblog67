<template>
    <div>
        <h1>Add Product</h1>

        <div class="create-blog">
            <button class="btn btn-success btn-sm" @click="navigateTo('/blog/create')">Add Product</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            blogs: [],
            search: '',
            BASE_URL: 'http://localhost:8081/assets/uploads/',
            allBlogs: [],
            results: [],
            category: [],
            brand_name: [],
            loading: false,
        };
    },
    async created() {
        this.allBlogs = (await BlogsService.index()).data; // ดึงข้อมูลทั้งหมดและเก็บไว้ใน allBlogs
        this.results = this.allBlogs; // เริ่มต้นผลลัพธ์ด้วยบล็อกทั้งหมด
        this.blogs = this.allBlogs.slice(0, LOAD_NUM); // แสดงบล็อกตามจำนวนที่ต้องการ
        this.populateCategories(); // Populate categories
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        async deleteBlog(blog) {
            try {
                await BlogsService.delete(blog);
                this.refreshData();
            } catch (err) {
                console.log(err);
            }
        },
        async refreshData() {
            this.allBlogs = (await BlogsService.index()).data;
            this.results = this.allBlogs;
            this.blogs = this.allBlogs.slice(0, LOAD_NUM); // อัปเดตข้อมูลให้แสดงตามจำนวน
        },
        setCategory(keyword) {
            this.search = keyword === ' ' ? '' : keyword;
        },
        populateCategories() {
            this.allBlogs.forEach(blog => {
                if (!this.category.includes(blog.brand_name)) {
                    this.category.push(blog.brand_name);
                }
            });
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('th-TH', options);
        },
        appendResults() {
            if (this.blogs.length < this.results.length) {
                const additionalBlogs = this.results.slice(this.blogs.length, this.blogs.length + LOAD_NUM);
                this.blogs = this.blogs.concat(additionalBlogs);
            }
        },
    },
    updated() {
        const sens = document.querySelector('#blog-list-bottom');
        pageWatcher = ScrollMonitor.create(sens);
        pageWatcher.enterViewport(this.appendResults);
    },
    beforeUpdated() {
        if (pageWatcher) {
            pageWatcher.destroy();
            pageWatcher = null;
        }
    },
}
</script>

<style scoped></style>