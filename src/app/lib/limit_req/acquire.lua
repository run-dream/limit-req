--- 获取令牌
--- 返回码
--- -1 获取令牌失败
--- 0+ 获取令牌成功
--- @param key 令牌标识
--- @param bucket_size 令牌桶大小
--- @param speed 每秒产生令牌数
local function acquire(key, bucket_size, speed)
    redis.replicate_commands()
    local limit_info = redis.call("HMGET", key, "last_timestamp", "count")
    local cur_time = redis.call("TIME")
    local cur_timestamp =  cur_time[1] * 1000000 + cur_time[2]
    --- 第一次获取 初始化limit_info
    if(type(limit_info[1])=="boolean") then 
        redis.call("HMSET", key, "last_timestamp", cur_timestamp, "count", speed - 1)
        return speed - 1
    end
    --- 计算上次获取到本次获取的时间差 产生token
    local last_timestamp = limit_info[1]
    local count = limit_info[2]
    local produce_count = math.floor((cur_timestamp - last_timestamp)/1000000*speed)
    -- 当前令牌数
    local new_count = tonumber(count) + produce_count
    if(tonumber(bucket_size) < tonumber(new_count)) then
        new_count = tonumber(bucket_size)
    end 
    -- 无可用令牌
    if(new_count < 1) then
        return -1
    end
    -- 更新limit_info
    redis.call("HMSET", key, "last_timestamp", cur_timestamp, "count", new_count - 1)
    return new_count-1
end

return acquire(ARGV[1], ARGV[2],ARGV[3])