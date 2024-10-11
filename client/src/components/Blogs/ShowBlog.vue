<template>
    <div class="blog-container">
        <h1>Show Blog</h1>
        <div class="blog-card">
            <p><strong>ID:</strong> {{ blog.id }}</p>
            <p><strong>Brand:</strong> {{ blog.brand_name }}</p>
            <p><strong>Details:</strong> {{ blog.content }}</p>
            <p><strong>Model:</strong> {{ blog.model }}</p>
            <p><strong>Year of Release:</strong> {{ blog.year_of_release }}</p>
            <p><strong>Operating System:</strong> {{ blog.operating_system }}</p>
            <p><strong>Screen Size (in inches):</strong> {{ blog.screen_size }}</p>
            <!-- <p><strong>Category:</strong> {{ blog.category }}</p>
        <p><strong>Status:</strong> {{ blog.status }}</p> -->

        </div>
        <div class="button-group">
            <button class="button-edit" v-on:click="navigateTo('/blog/edit/' + blog.id)">Edit Blog</button>
            <button class="btn btn-sm btn-danger" @click="deleteBlog(blog)">Delete</button>
            <button class="button-back" v-on:click="navigateTo('/blogs')">Back</button>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/services/BlogsService'
export default {
    data() {
        return {
            blog: null
        }
    },
    async created() {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        async deleteBlog(blog) {
            try {
                await BlogsService.delete(blog);
                this.refreshData();
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style scoped>
.blog-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 5%;
}

h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    color: #333;
}

.blog-card {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.blog-card p {
    margin-bottom: 10px;
    font-size: 1.5rem;
    line-height: 1.5;
}

.button-group {
    display: flex;
    justify-content: space-between;
}

.button-edit {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-edit:hover {
    background-color: #0056b3;
}

.button-back {
    background-color: #6c757d;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button-back:hover {
    background-color: #5a6268;
}
</style>