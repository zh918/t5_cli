#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const { program } = require('commander');
const chalk = require('chalk');
const exec = require('child_process').exec;
const stdin = process.stdin;
const bootstrap = require('./src/index.js');

program
  .command('create <projectName>')
  .description('项目名称')
  .action(function(projectName, options){
    // console.log('新建项目 "%s"', projectName);
    // 1.定义可生成哪些模板，供用户选择
    const templateArray = [
      't5-pc-template',
      't5-mobile-template'
    ];

    console.log(chalk.gray("*******************模板如下：*******************"));
    templateArray.forEach((t, i)=>{
      console.log((i + 1), t);
    });

    // 2.监听用户输入选项
    process.stdout.write("请选择需要生成的模板编号:")
    stdin.on("data", async function(data){
      let inputString = data.slice(0, data.length - 1).toString('utf-8').replace(/ /g,'');
      // console.log(templateArray[inputString-1]);
      // console.log('d=>', inputString);
      // if (!(/[0-9]+$/.test(inputString))) {
      //   console.log(chalk.red("请输入正确的模板编号"));
      //   return;
      // }
      if (inputString != 1 && inputString != 2) {
        console.log(chalk.red("输入有误，将直接导出第一个模板"));
        inputString = 1;
      }
      
      stdin.pause();
      console.log(chalk.blue(`你选择的模板为:${templateArray[inputString - 1]}`));
      let count = 1;
      let max = 4;
      let timeoutId = setInterval(()=>{
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        if (count == 1) process.stdout.write(chalk.red("正在下载模板，请稍等"));
        else if (count == 2) process.stdout.write(chalk.red("正在下载模板，请稍等."));
        else if (count == 3) process.stdout.write(chalk.red("正在下载模板，请稍等.."));
        else process.stdout.write(chalk.red("正在下载模板，请稍等..."));
        
        count++;
        if (count > max) count = 1;
      }, 1000);

      let projectPath = path.join(process.cwd(), projectName);

      if (inputString == 1) {
        await bootstrap.createPcTemplate(projectPath).then(flag=>{
          clearInterval(timeoutId);
          console.log('\n');
          if (flag) {
            console.log(chalk.green('*******************执行完成*******************'));
          }
          else {
            console.log(chalk.red('*******************执行失败，请重试*******************'));
          }
        });
      } 
      else if (inputString == 2) {
        await bootstrap.createMobileTemplate(projectPath).then(flag=>{
          clearInterval(timeoutId);
          console.log('\n');
          if (flag) {
            console.log(chalk.green('*******************执行完成*******************'));
          }
          else {
            console.log(chalk.red('*******************执行失败，请重试*******************'));
          }
        });
      }
      else if (inputString == 3) {

      }
      else if (inputString == 4) {
        
      }


      

    });


  }).on('--help', function() {
    
  });

program.parse(process.argv);

