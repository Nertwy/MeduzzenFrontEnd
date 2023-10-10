<template>
    <div class="custom-btn">
        <span class="label">Sign in with:</span>
        <div id="customBtn" class="customGPlusSignIn" @click="googleBtnPress">
            <span class="icon w-fit h-fit">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                    <path fill="#fbc02d"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z">
                    </path>
                    <path fill="#e53935"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z">
                    </path>
                    <path fill="#4caf50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z">
                    </path>
                    <path fill="#1565c0"
                        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
                    </path>
                </svg></span>
            <span class="buttonText">Google</span>
        </div>
    </div>
    <div id="name"></div>
</template>
<script setup lang='ts'>
import useStoreTyped from '@/store/store';
import { googlePress } from '@/utils/functions';
import { useRouter } from 'vue-router';

const googleBtnPress = async () => {
    try {
        const url = await googlePress()
        document.location.href = url
    } catch (error) {
        console.error(error);
    }

}
</script>
<style>
.custom-btn {
    font-size: 14px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
}

.customGPlusSignIn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    color: #444;
    width: 190px;
    border-radius: 5px;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    white-space: nowrap;
}

.customGPlusSignIn:hover {
    cursor: pointer;
}

span.label {
    font-family: serif;
    font-weight: normal;
}

span.icon {
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
}

span.buttonText {
    display: flex;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
}
</style>