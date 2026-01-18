import NetworkInstance from "@/components/network/NetworkInstance"

export interface NotificationData {
    market_id: string
    market_title: string
    amount_usd: number
    outcome: string
    timestamp: string
}

export interface Notification {
    id: string
    title: string
    message: string
    data: string // JSON string that needs parsing
    created_at: string
    timestamp: string
    trade_id: string
}

export interface ParsedNotification extends Omit<Notification, 'data'> {
    data: NotificationData
    type: 'LARGE_TRADE' | 'CLUSTER' | 'MARKET_OPEN' | 'MARKET_CLOSE'
}

/**
 * Fetch notification history from the API
 */
export async function fetchNotificationHistory(): Promise<ParsedNotification[]> {
    try {
        const api = NetworkInstance()
        const token = localStorage.getItem('beacon_access_token')

        const response = await api.get('/notifications/history', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        // Parse the nested data field and extract type from title
        return response.data.map((notification: Notification) => {
            const parsedData: NotificationData = JSON.parse(notification.data)

            // Extract notification type from title (e.g., "LARGE_TRADE Detected" -> "LARGE_TRADE")
            let type: ParsedNotification['type'] = 'CLUSTER'
            if (notification.title.includes('LARGE_TRADE')) {
                type = 'LARGE_TRADE'
            } else if (notification.title.includes('CLUSTER')) {
                type = 'CLUSTER'
            } else if (notification.title.includes('MARKET_OPEN')) {
                type = 'MARKET_OPEN'
            } else if (notification.title.includes('MARKET_CLOSE')) {
                type = 'MARKET_CLOSE'
            }

            return {
                ...notification,
                data: parsedData,
                type,
            }
        })
    } catch (error) {
        console.error('Error fetching notification history:', error)
        return []
    }
}

/**
 * Connect to WebSocket for real-time notifications
 */
export function connectNotificationWebSocket(
    onNotification: (notification: ParsedNotification) => void
): WebSocket | null {
    try {
        const token = localStorage.getItem('beacon_access_token')

        // Use wss:// for secure WebSocket connection
        // Include token as query parameter since WebSocket doesn't support headers
        const wsUrl = `wss://polymarketcrawler.onrender.com/ws/notifications?token=${token}`
        const ws = new WebSocket(wsUrl)

        ws.onopen = () => {
            console.log('WebSocket connected')
        }

        ws.onmessage = (event) => {
            try {
                const notification: Notification = JSON.parse(event.data)
                const parsedData: NotificationData = JSON.parse(notification.data)

                // Extract notification type from title
                let type: ParsedNotification['type'] = 'CLUSTER'
                if (notification.title.includes('LARGE_TRADE')) {
                    type = 'LARGE_TRADE'
                } else if (notification.title.includes('CLUSTER')) {
                    type = 'CLUSTER'
                } else if (notification.title.includes('MARKET_OPEN')) {
                    type = 'MARKET_OPEN'
                } else if (notification.title.includes('MARKET_CLOSE')) {
                    type = 'MARKET_CLOSE'
                }

                const parsed: ParsedNotification = {
                    ...notification,
                    data: parsedData,
                    type,
                }

                onNotification(parsed)
            } catch (error) {
                console.error('Error parsing WebSocket message:', error)
            }
        }

        ws.onerror = (error) => {
            console.error('WebSocket error:', error)
        }

        ws.onclose = () => {
            console.log('WebSocket disconnected')
        }

        return ws
    } catch (error) {
        console.error('Error connecting to WebSocket:', error)
        return null
    }
}

/**
 * Format timestamp to relative time (e.g., "2 min ago")
 */
export function formatRelativeTime(timestamp: string): string {
    const now = new Date()
    const time = new Date(timestamp)
    const diffMs = now.getTime() - time.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
}

/**
 * Format USD amount
 */
export function formatUSD(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}
