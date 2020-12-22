<template>
    <div>
        <quill-editor ref="myTextEditor" v-model="content">
        </quill-editor>
        <!-- <quill-editor ref="myTextEditor"
              :content="content"
              :config="editorOption"
              @change="onEditorChange($event)">
        </quill-editor> -->
    </div>
</template>
<script>
export default {
  data () {
    return {
      content: '<h2>I am Example</h2>',
      url:fudian.host,//网站地址
    }
  },
  created:function(){
		// http://float.lihope88.com/api/index/worker
		// this.$axios.post("http://float.lihope88.com/api/index/worker")
		// .then((res)=>{
        // //   return Promise.resolve(res.data)
        //   console.log(res)
        // //   console.log('提交成功')
		// });
		var url = this.url+"/api/index/worker";
		this.$http.get(url).then(result=>{
			console.log(result.body.data)
			// console.log(result.data.data)
            // this.content = result.body.data;
            // console.log(this.content)
			// console.log(this.careersInfoList);
			// console.log(result.body);
			// this.info = result.body;
		})
	}
}
</script>